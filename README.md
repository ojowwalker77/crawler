Web Scraping

This project automates the process of extracting content from web page, analyzing its structure, and generating a final HTML file with replaced links, iframes and content.

The stack was choose by performance.


Installation

Clone the repository

Install Node.js dependencies:

npm install

Install Python dependencies:

pip install -r requirements.txt

Usage

Run the main script to start the web scraping process:

./run_process.sh

Follow the on-screen instructions to complete the process.

File Structure

crawler.js: Node.js script to crawl a web page and extract its content.
getIframeLinks.py: Python script to extract iframe links from an HTML file.
mountRealURLS.py: Python script to create a JSON file with real URLs.
replace.py: Python script to replace links in an HTML file.
replaceIframe.py: Python script to replace iframes in an HTML file.
contentAnalysis.py: Python script to analyze the content of an HTML file.
output.html: Temporary HTML file generated during the process.
output.json: Temporary JSON file generated during the process.
real_urls.json: JSON file containing real URLs.
replaced_output.html: HTML file with replaced links.
final.html: Final HTML file with replaced links and iframes.
