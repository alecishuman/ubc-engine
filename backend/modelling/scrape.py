import requests
from bs4 import BeautifulSoup
import nltk

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

    chunked_docs = []
    for doc in documents:
        chunk_data = [
            {page_url: doc[page_url], "title": doc["title"], "content": c}
            for c in chunk_text(doc)
        ]
        chunked_docs.extend(chunk_data)
    return chunked_docs


def scrape_page(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    main_content = soup.find("main", {"id": "main-content"})
    title = " ".join(main_content.find(class_="page-title").get_text().split())
    main_content.find("nav").decompose()
    content = main_content.get_text().replace(title, "", 1)
    content = " ".join(content.split())
    return {page_url: url, "title": title, "content": content}


def chunk_text(doc, max_chunk_size=200):
    chunks = []
    sent = nltk.sent_tokenize(doc["content"])
    for s in sent:
        if len(s) > max_chunk_size:
            chunks.extend(s.split(max_chunk_size))
        else:
            chunks.append(s)
    return chunks
