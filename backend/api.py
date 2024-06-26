from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import ast
from pyabsa import ABSAInstruction
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
import ast

def compute_laptop_score(products, comments, aspects_from_query, id_to_distance):
    """
    Compute the laptop score based on the certain attributes
    """
    result = {}

    max_upvotes = max([comments[comment]['score'] for val in products.values() for comment in val])
    max_comments = max([len(val) for val in products.values()])
    for product, val in products.items():
        score = 0
        result[product] = {}
        result[product]['comments'] = {}
        result[product]['total_comments'] = len(val)
        total_upvotes = 0
        average_thread_similarity = 0
        for comment in val:
            aspects_matched = 0
            for i in aspects_from_query:
                aspects_matched += comments[comment][i]
            upvotes = comments[comment]['score']
            total_upvotes += upvotes
            similarity = id_to_distance[comments[comment]['thread_id']]
            average_thread_similarity += similarity
            score += (upvotes/max_upvotes + aspects_matched/len(aspects_from_query) + similarity+ len(val)/max_comments)/4
            result[product]['comments'][comment] = {
                'upvotes': upvotes,
                'aspects_matched': aspects_matched,
                'similarity': similarity
            }
        result[product]['average_thread_similarity'] = average_thread_similarity/len(val)
        result[product]['total_upvotes'] = total_upvotes
        result[product]['score'] = score/len(val)  * 100
    return result

def query_to_dict(query, crsr):
    """
    Convert the query result to a dictionary
    """
    result = {}
    for i in query:
        tmp_result = {}
        for j in range(len(crsr.description)):
            tmp_result[crsr.description[j].name] = i[j]
            if crsr.description[j].name == 'embeddings':
                tmp_result[crsr.description[j].name] = [float(x) for x in i[j][1:-1].split(',')]
        result[tmp_result['id']] = tmp_result
    return result

def laptop_to_dict(query, crsr):
    """
    Convert the laptop query result to a dictionary
    """
    result = {}
    for i in query:
        tmp_result = {}
        for j in range(len(crsr.description)):
            tmp_result[crsr.description[j].name] = i[j]
        result[tmp_result['name']] = tmp_result
    return result

def get_aspects(quadruples):
    """
    Get the aspects from the quadruples
    """
    result = set()
    for i in quadruples:
        category = i['category']
        if '#' in category:
            mid = category.index('#')
            if category[:mid] == 'LAPTOP':
                result.add(category[mid+1:])
            else:
                result.add(category[:mid])
    return list(result)

def map_laptop_to_comments(recommendations):
    """
    Get the laptops that are recommended in the comments
    Then map the laptop to the comments
    """
    product_comment_list = {}
    for key, val in recommendations.items():
        laptop_list = [laptop for laptop in ast.literal_eval(val['laptop_found'])]
        for laptop in laptop_list:
            if laptop not in product_comment_list:
                product_comment_list[laptop] = []
            product_comment_list[laptop].append(key)
    return product_comment_list

def get_parent_aspects(recommendations, aspect_list):
    """
    Get the aspects from the parent comments of the comment

    """
    for key,val in recommendations.items():
        parent_full_id = val['parent_id']
        parent_id = parent_full_id[3:]
        is_top_comment = parent_full_id[:2] == 't3'
        while not is_top_comment and parent_id in comments:
            parent = comments[parent_id]
            for i in aspect_list:
                if parent[i] == 1:
                    recommendations[key][i] = 1
            parent_full_id = parent['parent_id']
            parent_id = parent_full_id[3:]
            is_top_comment = parent_full_id[:2] == 't3'
    return recommendations

def get_recommendation_comments(thread_ids, comments):
    """
    Get the comments under chosen submission that are recommending a product
    """
    recommendation_comment = {}
    for key, val in comments.items():
        if val['is_recommend'] == 1 and len(val['laptop_found']) > 2 and val['thread_id'] in thread_ids:
            recommendation_comment[key] = val
    return recommendation_comment

def get_data_from_db():
    """
    Connect to the database and get all the data
    """
    connection = psycopg2.connect(host='localhost',port='5432',database='fyp',user='postgres',password='9988')
    crsr = connection.cursor()

    crsr.execute('select * from submissions;')
    submissions = query_to_dict(crsr.fetchall(),crsr)

    crsr.execute('select * from comments;')
    comments = query_to_dict(crsr.fetchall(),crsr)

    crsr.execute('select * from laptops;')
    laptops = laptop_to_dict(crsr.fetchall(),crsr)

    return submissions, comments, laptops

def get_laptops(products):
    """
    Get the laptops using the key
    """
    for key,val in products.items():
        if key in laptops:
            products[key]['image']  = laptops[key]['image']
            products[key]['price'] = laptops[key]['price']
    return products

def get_comments(products):
    """
    Get the comments for each product
    """
    
    for key,val in products.items():
        comment_list = []
        for comment in val['comments']:
            if comment in comments:
                comment_list.append(comments[comment]['text'])
        products[key]['comments'] = comment_list
    return products

def create_id(products):
    """
    Create an id for each product
    """
    result = []
    count = 0
    for key, val in products.items():
        val['name'] = key
        val['id'] = count
        result.append(val)
        count += 1
    return result

app = Flask(__name__)
CORS(app)

# load models before everything to avoid loading them multiple times
encoder = SentenceTransformer('bert-base-nli-mean-tokens')
aspect_extractor = ABSAInstruction.ABSAGenerator("model")

submissions, comments, laptops = get_data_from_db()

"""
Run this code, 
then access the API through
http://127.0.0.1:5000/search_result?query=laptop with great battery

"""
print("API finished loading")

last_query = None

@app.route('/search_result', methods=['GET'])
def search_result():
    global last_query
    # get user text query
    user_query = request.args.get('query')

    # convert user query to embeddings
    encoded = encoder.encode(user_query)

    # get the cosine similarity between the user query and all the submissions
    sub_with_distance = sorted([(key,cosine_similarity([encoded], [val["embeddings"]])[0][0]) for key,val in submissions.items()], key=lambda x: x[1], reverse=True)

    # get the top 50 submissions into a dictionary
    id_to_distance = {key:val for key,val in sub_with_distance[:50]}

    # get the top 20 thread ids
    thread_ids = [i[0] for i in sub_with_distance[:20]]

    # extract quadruples from the user query
    quadruples_from_query = aspect_extractor.predict(user_query)['Quadruples']

    # get the aspects from the quadruples
    aspects_from_query = get_aspects(quadruples_from_query)

    # get the comments that are recommendations under the top 20 threads
    recommendation_comment = get_recommendation_comments(thread_ids, comments)

    # get the aspects medntioned in the parent comments of the recommendations
    recommendations = get_parent_aspects(recommendation_comment,aspects_from_query)

    # map the laptops to the comments
    product_comment_list = map_laptop_to_comments(recommendations)

    # compute the laptop score
    product_scores = compute_laptop_score(product_comment_list, comments, aspects_from_query, id_to_distance)

    # get the laptops
    result = get_laptops(product_scores)

    # get the comments for each product
    result = get_comments(result)

    result = create_id(result)
    last_query = result
    return jsonify(result)


# use the route http://127.0.0.1:5000/filter_price?max=&min=
# to filter laptop using price
@app.route('/filter_price', methods=['GET'])
def filter_by_range():
    global last_query
    # get user text query
    max_price = request.args.get('max')
    min_price = request.args.get('min')
    if not max_price or not min_price:
        return jsonify({"error": "max and min parameters are required"}), 400
    max_price = int(max_price)
    min_price = int(min_price)
    result = []
    for laptop in last_query:
        if 'price' in laptop and int(laptop['price']) <= max_price and int(laptop['price']) >= min_price:
            result.append(laptop)
    return jsonify(result)



# use the route http://127.0.0.1:5000/search_laptop_by_id?query=
# to search for laptop using the name
@app.route('/search_laptop_by_id', methods=['GET'])
def search_laptop():
    global last_query
    # get user text query
    laptop_id = request.args.get('query')
    result = last_query[int(laptop_id)]
    result['laptop_details'] = laptops[result['name']]
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)