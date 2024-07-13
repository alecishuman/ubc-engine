import os
from dotenv import load_dotenv
from pinecone import Pinecone
from llama_index.vector_stores.pinecone import PineconeVectorStore

load_dotenv()

pc = Pinecone(api_key=os.environ.get("PINECONE_API_KEY"))
index_name = "ubcengine"
pc.delete_index(index_name)
pc.create_index(index_name, metric="cosine", dimension=1536)
pc_index = pc.index(index_name)

vector_store = PineconeVectorStore(pc_index)
