---
layout: post
title:  "Como publicar en jekyll"
date:   2015-02-24 20:21:31
categories: jekyll update
---
 Primero es iniciar git( git init) con tu repositorio creado. Usar git status para ver
 todos los elementos que contiene tu proyecto de jekyll, y hacer git add para añadir al
 repositorio los que te interesa tener (se puede hacer todo en una linea "git add file1 
 file2 file3 ...). Luego configuras:

```
 [razvan@acer-f16 RazBlog]$ git config user.name "Razvan Puscas"
[razvan@acer-f16 RazBlog]$ git config user.email "rpuscas94@gmail.com"
[razvan@acer-f16 RazBlog]$ git config --global user.email "rpuscas94@gmail.com"
[razvan@acer-f16 RazBlog]$ git config --global user.name "Razvan Puscas"
```

Haces un primer commit(` git commit`) y en el fichero que abren puedes escribir arriba el 
mensaje que quieras.
Usas el comando (`git remote add origin https://github.com/rpuscas/rpuscas.github.io.git
` ) para hacer una copia en remoto de tu origin del repositorio.
Hacer un push al origin del branch(rama) "master" (`git push -u origin master`).

Para hacer posts al blog => cd posts
y abres el fichero con => vim nombre-fichero

Una vez modificado haces git commit nombre-fichero y haces el git push.
