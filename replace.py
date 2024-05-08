import re
from bs4 import BeautifulSoup
import urllib.parse

def substituir_links(html_file_path, novo_dominio):
    with open(html_file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    soup = BeautifulSoup(content, 'html.parser')

    for iframe in soup.find_all('iframe', src=True):
        src = iframe['src']
        match = re.search(r'file=(.+)$', src)

        if match:
            old_file_path = match.group(1)
            sanitized_text = re.sub(r'\.pdf.*$', '.pdf', old_file_path.strip())
            sanitized_text = re.sub(r'%20{2,}', '%20', sanitized_text)
            sanitized_text = urllib.parse.quote(sanitized_text)

            new_src = f"{novo_dominio}{sanitized_text}"
            iframe['src'] = new_src

    for link in soup.find_all('a', href=True):
        href = link['href']
        match = re.search(r'resource\.aspx\?id=(\d+)', href)

        if match:
            sanitized_text = re.sub(r'\.pdf.*$', '.pdf', link.text.strip())
            sanitized_text = re.sub(r'%20{2,}', '%20', sanitized_text)
            sanitized_text = urllib.parse.quote(sanitized_text)

            new_href = f"{novo_dominio}{sanitized_text}"
            link['href'] = new_href

    new_file_path = 'replaced_' + html_file_path

    with open(new_file_path, 'w', encoding='utf-8') as file:
        file.write(str(soup))

substituir_links('<TARGET_HTML>', '<path/to/folder>')
