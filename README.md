# Cities

## Embed in a page
- Run `npm run build`
- Copy static files from build/ to your server
- Include the necessary scripts
```html
<link rel="stylesheet" type="text/css" href="/static/css/main.css" />
<script type="text/javascript" src="/static/js/main.js"></script>
```
- Initialize the map application
```html
<script type="text/javascript">
    window.onload = function() {
        new CitiesApp(document.getElementById('root'), {
            apiURL: 'http://api-url.com',
        });
    }
</script>
```

## Develop


### 1) Install

```bash
npm install
```

### 2) Run

```bash
npm run
```a