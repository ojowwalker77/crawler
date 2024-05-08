import json
from urllib.parse import urljoin

def read_links_from_json(json_file_path):
    with open(json_file_path, 'r') as file:
        pdf_links = json.load(file)
    return pdf_links

def construct_full_urls(base_url, pdf_links):
    full_urls = []
    for link in pdf_links:
        full_url = urljoin(base_url, link['url'])
        full_urls.append({'title': link['title'], 'full_url': full_url, 'name': link['name']})
    return full_urls

def save_full_urls_to_json(full_urls, json_file_path):
    with open(json_file_path, 'w') as file:
        json.dump(full_urls, file, indent=2)

def main():
    json_file_path = 'output_links.json'
    base_url = 'https://senior-stpauls.fireflycloud.net/'

    pdf_links = read_links_from_json(json_file_path)
    full_urls = construct_full_urls(base_url, pdf_links)

    save_full_urls_to_json(full_urls, 'real_urls.json')
    print(f"Full URLs saved to real_urls.json")

if __name__ == "__main__":
    main()
