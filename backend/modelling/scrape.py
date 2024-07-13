import requests
from bs4 import BeautifulSoup

page_url = "https://www.cs.ubc.ca/"


def scrape(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")

    nav = soup.find("nav", {"id": "ubc7-unit-menu"})
    nav_links = set()
    for nav_link in nav.find_all("a"):
        if nav_link.has_attr("href"):
            nav_links.add("https://www.cs.ubc.ca" + nav_link["href"])

    documents = []
    for link in nav_links:
        documents.append(scrape_page(link))


def scrape_page(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")

    main_content = soup.find("main", {"id": "main-content"})
    title = (
        main_content.find(class_="page-title")
        .get_text()
        .replace("\n", " ")
        .replace("\r", "")
    )
    print(title)
