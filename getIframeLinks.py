from bs4 import BeautifulSoup
import json

def extract_pdf_links(html_file_path):
    with open(html_file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    soup = BeautifulSoup(content, 'html.parser')

    pdf_links = []
    resource_divs = soup.find_all('div', class_='ff-component-block')

    for resource_div in resource_divs:
        header = resource_div.find('h3', class_='ff-component-header')
        if header:
            title_parts = []
            for part in header.stripped_strings:
                if part != "-":
                    title_parts.append(part)
            title = " ".join(title_parts)

            ul = resource_div.find('ul', class_='ff-resourcelist')
            if ul:
                pdf_link = ul.find('a', href=True)
                if pdf_link:
                    pdf_url = pdf_link['href']
                    pdf_name = pdf_link.text.strip()
                    pdf_links.append({'title': title, 'url': pdf_url, 'name': pdf_name})

    return pdf_links

def save_links_to_json(pdf_links, json_file_path):
    with open(json_file_path, 'w') as file:
        json.dump(pdf_links, file, indent=2)

def main():
    html_file_path = 'topic10.html'
    json_file_path = 'topic10.json'

    pdf_links = extract_pdf_links(html_file_path)
    save_links_to_json(pdf_links, json_file_path)
    print(f"PDF links extracted and saved to {json_file_path}")

if __name__ == "__main__":
    main()
