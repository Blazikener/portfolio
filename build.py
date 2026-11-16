import json,re,pathlib
R=pathlib.Path(__file__).parent
icons={}
for f in (R/'icons').glob('*.svg'):
    s=f.read_text();s=re.sub(r'<title>.*?</title>','',s);icons[f.stem]=s
h=(R/'src/index.html').read_text()
for k,v in {'/*CSS*/':(R/'src/style.css').read_text(),'/*MATTER*/':(R/'vendor/matter.min.js').read_text(),'/*LENIS*/':(R/'vendor/lenis.min.js').read_text(),'/*ICONS*/':json.dumps(icons),'/*APP*/':(R/'src/app.js').read_text()}.items():
    h=h.replace(k,v.replace('</script','<\\/script'))
(R/'index.html').write_text(h)
print(len(h))
