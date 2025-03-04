# Laptop Recommender System Based on User Reviews on Reddit

Laptop Recommender System Based on User Reviews on Reddit is the **Final Year Project** of Team MCS5 from Monash University.

## Overview

This project provides a full-stack laptop recommendation system powered by **Natural Language Processing (NLP)** techniques. By scraping **Reddit** threads for user reviews, we use **BERT based semantic search** for text representation and **Aspect Term Based Sentiment Analysis** to generate meaningful recommendations.

## Features

- **Web Scraper**: Automated data scraping with **Selenium** for Reddit posts and comments.  
- **Machine Learning**:  
  - **BERT Embeddings** for document representation.  
  - **Aspect-Based Sentiment Analysis** for extracting sentiments on specific laptop attributes (battery life, performance, etc.).  
- **Recommendation Engine**: Utilizes aggregated sentiment scores and user preferences to suggest the best laptops.  
- **Full Stack Implementation**:  
  - **Frontend**: [Next.js](https://nextjs.org/) for a responsive UI.  
  - **Backend**: [Flask](https://flask.palletsprojects.com/) for serving ML models and APIs.  
  - **Database**: [PostgreSQL](https://www.postgresql.org/) for scalable data storage.  


## How It Works

1. **Data Collection**:  
   - The system uses Selenium to crawl relevant laptop brands and models.  
   - The collected data is then stored in a PostgreSQL database.

2. **Text Processing & Modeling**:  
   - Text data is cleaned and preprocessed for NLP tasks.  
   - **BERT** embeddings provide robust vector representations.  
   - **Aspect Term Based Sentiment Analysis** identifies user sentiment on specific laptop attributes (e.g., battery life, performance, price).

3. **Recommendation Generation**:  
   - User inputs or preferences are matched against sentiment scores and embeddings to suggest the most suitable laptops.  
   - The recommendation engine is served through a Flask API.

4. **Frontend Display**:  
   - A Next.js application fetches recommendations from the Flask API and displays them in a user-friendly interface.  



**Team MCS5** – Monash University  
We hope this system helps users find the perfect laptop based on real user reviews! If you have any questions or feedback, please reach out or open an issue.
