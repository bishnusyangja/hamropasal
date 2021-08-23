let api_url = '';
if (window.location.hostname == 'app.sunya.health') {
    api_url = 'http://api.sunya.health';
}else{
    api_url = 'http://127.0.0.1:8000';
}

export const environment = {
   REACT_APP_BACKEND_HOST : api_url
}