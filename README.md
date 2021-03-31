# Napker
Brazillian social network that connects people with shared interests.

# Motivation
Nowadays social networks can basically be divided into two cathegories: connection focused (Facebook, LinkedIn...) and content focused (YouTube, Reddit, TikTok, Instagram...)
Napker would fit into the connection focused social network cathegory.

The main purpose of this social network is to give users control over the data generated in the platform so they can easily find other people with advanced searchs.
This is done with customizable algorithm weights and an advanced user search by interest system.

# Project architecture
Django-React monorepo

Django handles the create-react-app frontend javascript and css as its static files. Every non api route (except the admin route) ends up rendering the index.html create-react-app file, the app routes are then handled by react router dom.

# Demo
https://user-images.githubusercontent.com/67564586/113099932-1d422a80-91d1-11eb-9930-74ab052dd52a.mp4
![demo](https://user-images.githubusercontent.com/67564586/113100440-ce48c500-91d1-11eb-8dda-d94acba62108.gif)
![Captura de Tela (148)](https://user-images.githubusercontent.com/67564586/113099165-eb7c9400-91cf-11eb-9290-dfaa95bd7bfb.png)
![Captura de Tela (154)](https://user-images.githubusercontent.com/67564586/113099188-f59e9280-91cf-11eb-8c85-226bdc0dada3.png)
![Captura de Tela (155)](https://user-images.githubusercontent.com/67564586/113099190-f6372900-91cf-11eb-8e2c-14ef3ed1aacb.png)
![Captura de Tela (149)](https://user-images.githubusercontent.com/67564586/113099192-f6372900-91cf-11eb-856a-e4940fe905ec.png)
![Captura de Tela (150)](https://user-images.githubusercontent.com/67564586/113099195-f6cfbf80-91cf-11eb-81b7-1012ab3c07c8.png)
![Captura de Tela (151)](https://user-images.githubusercontent.com/67564586/113099196-f7685600-91cf-11eb-9a73-53b1cc4125c4.png)
![Captura de Tela (152)](https://user-images.githubusercontent.com/67564586/113099198-f7685600-91cf-11eb-8bba-7465b2e5a72c.png)
![Captura de Tela (153)](https://user-images.githubusercontent.com/67564586/113099199-f800ec80-91cf-11eb-9256-e36260e450c9.png)

