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
    for i, link in enumerate(nav_links):
        try:
            documents.append(scrape_page(link))
        except:
            print(f"Error scraping {link}")
        # if i % 50 == 0:
        if i == 20:
            print(f"Scraped {i} pages")
            break


def scrape_page(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    main_content = soup.find("main", {"id": "main-content"})
    title = " ".join(main_content.find(class_="page-title").get_text().split())
    main_content.find("nav").decompose()
    content = main_content.get_text().replace(title, "", 1)
    content = " ".join(content.split())
    print(title)
