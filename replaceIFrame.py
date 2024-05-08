#from bs4 import BeautifulSoup

#def replace_iframe_with_href_in_file(input_file_path, output_file_path):
  #  with open(input_file_path, 'r', encoding='utf-8') as file:
  #      content = file.read()

 #   soup = BeautifulSoup(content, 'html.parser')
 #   iframes = soup.find_all('iframe')
 #   a_tags = soup.find_all('a') #trocar pra 'a' ou 'url'

 #   for iframe, a_tag in zip(iframes, a_tags):
 #       if iframe and a_tag:
 #           new_src = a_tag['href']
#            iframe['src'] = new_src

#    with open(output_file_path, 'w', encoding='utf-8') as file:
#        file.write(str(soup))


                                #primeiro o arquivo alvo --- segundo o arquivo que ele gera
#replace_iframe_with_href_in_file('replaced_mrgreen.html', 'mrgreen0.html')

from bs4 import BeautifulSoup
import urllib.parse

def replace_src_inside_iframe_with_href(input_file_path, output_file_path):
    with open(input_file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    soup = BeautifulSoup(content, 'html.parser')
    iframes = soup.find_all('iframe')

    for iframe in iframes:
        parent_li = iframe.find_parent('li')
        a_tag = parent_li.find('a')
        if a_tag and 'href' in a_tag.attrs:
            new_src = a_tag['href']
            new_src_path = urllib.parse.urlparse(new_src).path
            iframe['src'] = new_src_path

    with open(output_file_path, 'w', encoding='utf-8') as file:
        file.write(str(soup))

replace_src_inside_iframe_with_href('replaced_output.html', 'final.html')
