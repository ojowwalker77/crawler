#!/bin/bash

for i in {1..1}; do
    node crawler.js "https://senior-stpauls.fireflycloud.net/science/ib-science/ib-physics/mr-green-ib-physics-last-exam-2024" > "output_$i.html"
    echo "Content extracted"

    python getIframeLinks.py "output_$i.html" > "output_$i.json"
    echo "Links extracted"

    (python mountRealURLS.py > "real_urls.json" &)
    echo "mountRealURLS.py started in background. Output will be saved as real_urls.json."

    (node downloadContent.js &)
    echo "downloadContent.js started in background."

    python replace.py "output.html" > "replaced_output.html"
    echo "replace.py completed successfully. Output saved as replaced_output.html."

    python replaceIframe.py "replaced_output.html" > "final.html"
    echo "replaceIframe.py completed successfully. Output saved as final.html."

    echo "All scripts completed successfully."
done
