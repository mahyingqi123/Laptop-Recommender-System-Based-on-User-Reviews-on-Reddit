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

url = "https://technave.com/gadgets/Laptop-Price-Malaysia-119.html#page-1"
ua = UserAgent()
user_agent = ua.random
chrome_options = Options()
# chrome_options.add_argument("--headless=new")
chrome_options.add_argument(f'user-agent={user_agent}')
driver = webdriver.Chrome(options=chrome_options)
driver.set_window_size(900,1100)
# driver.get(url)
# WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH,'//div[contains(@class,"pageNumbers")]')))
# page_numbers = driver.find_elements(By.XPATH,'//div[contains(@class,"pageNumbers")]//a')
# page = 1
# laptop_url = {}

# WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH,'//ul[contains(@class,"items")]')))
# laptop_list = driver.find_elements(By.XPATH,'//ul[contains(@class,"items")]//li')
# for laptop in laptop_list:
#     link = laptop.find_element(By.XPATH,'.//a').get_attribute('href')
#     name = laptop.find_element(By.XPATH,'.//a').get_attribute('title')
#     price = laptop.find_element(By.XPATH,'.//div//span').text
#     if name not in laptop_url:
#         laptop_url[name] = {}
#     laptop_url[name]["url"] = link
#     laptop_url[name]["price"] = price

# print(len(laptop_url))


# with open("laptop_url.json", "w") as f:
#     f.write(json.dumps(laptop_url, indent=4))
# driver.quit()

laptop_file = open("laptop_url.json", "r")
laptop_url = json.load(laptop_file)
laptop_file.close()
count = 0
for laptop in laptop_url:
    user_agent = ua.random
    chrome_options = Options()
    chrome_options.add_argument("--headless=new")
    chrome_options.add_argument(f'user-agent={user_agent}')
    driver = webdriver.Chrome(options=chrome_options)
    driver.get(laptop_url[laptop]["url"])
    try:
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH,'//span[@id="pricefrom"]')))
        laptop_url[laptop]["price"] = driver.find_element(By.XPATH,'//span[@id="pricefrom"]').text
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH,'//table[@id="gadget-specs"]')))
        table = driver.find_element(By.XPATH,'//table[@id="gadget-specs"]')
        specs = {}
        for row in table.find_elements(By.XPATH,'.//tr'):
            try:
                row.find_element(By.XPATH,'.//td')
            except:
                continue
            key = row.find_element(By.XPATH,'.//th').text
            value = row.find_element(By.XPATH,'.//td').text
            specs[key] = value
        laptop_url[laptop]["specs"] = specs
    except:
        print("Failed to scrape: "+laptop_url[laptop]["url"])
    driver.quit()
    count += 1
    print(laptop_url[laptop])
    print("laptop scraped: "+str(count))
with open("laptop_details.json", "w") as f:
    f.write(json.dumps(laptop_url, indent=4))


