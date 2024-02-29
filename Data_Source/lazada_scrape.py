import requests
from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import time
from datetime import date
from bs4 import BeautifulSoup
import json
import requests
from loguru import logger
from fake_useragent import UserAgent
from random import randint


# A webscraper to scrape the laptop specification from Lazada
# An API is taken from Lazada to get the list of laptops
# The API is then used to get the URL of each laptop
# Selenium is used to scrape the laptop

response = requests.get('https://www.lazada.com.my/shop-laptops/?ajax=true&isFirstRequest=true&page=1')
print(response.text)
response_json = json.loads(response.text) 
json_str = json.dumps(response_json, indent=4)

item_list = response_json['mods']['listItems']
f = open("lazada.json", "w")
f.write(json_str)
f.close()
result = []
logger.add("lazada"+str(date.today())+".log")
logger.debug("List of item: "+str(item_list))
logger.debug ("Number of laptops to be scraped: "+str(len(item_list)))
item_scraped_count = 0
for i in range(0,len(item_list)):
    ua = UserAgent()
    user_agent = ua.random
    item_url = item_list[i]['itemUrl']
    logger.debug("Item URL: "+item_url)
    chrome_options = Options()
    # chrome_options.add_argument("--headless=new")
    chrome_options.add_argument(f'user-agent={user_agent}')
    driver = webdriver.Chrome(options=chrome_options)
    driver.set_window_size(900,1100)
    driver.get("https:"+item_url)
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH,'//*[contains(@class,"pdp-mod-product-badge-title")]')))
    laptop_name = driver.find_element(By.XPATH,'//*[contains(@class,"pdp-mod-product-badge-title")]').text
    new_laptop = {}
    new_laptop['laptop_name'] = laptop_name
    height = 50
    wait_count = 0
    logger.debug("Laptop name: "+laptop_name)
    while True:
        try: 
            driver.execute_script("window.scrollTo(0, "+str(height)+");")
            logger.debug("Scrolling to load more content")
            WebDriverWait(driver, 3).until(EC.presence_of_element_located((By.XPATH,'//*[contains(@class,"pdp-view-more-btn")]')))
            driver.find_element(By.XPATH,'//*[contains(@class,"pdp-view-more-btn")]').click()
            break
        except:
            if wait_count > 5:
                time.sleep(10)
            height += 50
    logger.debug("Content loaded")
    specification_list = driver.find_elements(By.XPATH,'//*[contains(@class,"specification-keys")]/li')
    
    for j in range(0,len(specification_list)):
        spec_name = driver.find_element(By.XPATH,'//*[contains(@class,"specification-keys")]/li['+str(j+1)+']/span').text
        spec_val = driver.find_element(By.XPATH,'//*[contains(@class,"specification-keys")]/li['+str(j+1)+']/div').text
        new_laptop[spec_name] = spec_val
    result.append(new_laptop)
    item_scraped_count += 1
    logger.debug("Number of laptop scraped: "+str(item_scraped_count))
    logger.debug("Laptop specification: "+str(new_laptop))
    driver.quit()
    time.sleep(randint(1,9))
    if item_scraped_count%10 == 0:
        time.sleep(120)

logger.debug("List of laptop specification: "+str(result))
f = open("result.json", "w")
f.write(json.dumps(result, indent=4))
f.close()

