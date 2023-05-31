#from sklearn.metrics.pairwise import pairwise_distances
import numpy as np


# On suppose disposer de la liste des films notés par l'utilisateur [(film_id,rating)] movies_rated
# On a la liste de tous les films de la plateforme all_movies (id, genres,avg_rate)
# En sortie on a une liste des (score,film_id) triés par pertinence

# exemple ici avec 3 films
all_movies = [
    {
        "adult": False,
        "backdrop_path": "/h8gHn0OzBoaefsYseUByqsmEDMY.jpg",
        "genres": [{"id":28},{"id":53}
        ],
        "id": 603692,
        "original_language": "en",
        "original_title": "John Wick: Chapter 4",
        "overview": "With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.",
        "popularity": 8361.829,
        "poster_path": "/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
        "release_date": "2023-03-22",
        "title": "John Wick: Chapter 4",
        "video": False,
        "vote_average": 8,
        "vote_count": 2263
    },
    {
        "adult": False,
        "backdrop_path": "/2klQ1z1fcHGgQPevbEQdkCnzyuS.jpg",
        "genres": [{"id":16},{"id":10751},{"id":12},{"id":14}
        
        ],
        "id": 502356,
        "original_language": "en",
        "original_title": "The Super Mario Bros. Movie",
        "overview": "While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe and wander into a magical new world. But when the brothers are separated, Mario embarks on an epic quest to find Luigi.",
        "popularity": 5236.756,
        "poster_path": "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
        "release_date": "2023-04-05",
        "title": "The Super Mario Bros. Movie",
        "video": False,
        "vote_average": 2,
        "vote_count": 3778
    },
    {
        "adult": False,
        "backdrop_path": "/4t0oBFrJyweYPt0hocW6RUa0b6H.jpg",
        "genres": [{"id":28},{"id":53},{"id":80}
        ],
        "id": 385687,
        "original_language": "en",
        "original_title": "Fast X",
        "overview": "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path. Now, they confront the most lethal opponent they've ever faced: A terrifying threat emerging from the shadows of the past who's fueled by blood revenge, and who is determined to shatter this family and destroy everything—and everyone—that Dom loves, forever.",
        "popularity": 3879.447,
        "poster_path": "/1E5baAaEse26fej7uHcjOgEE2t2.jpg",
        "release_date": "2023-05-17",
        "title": "Fast X",
        "video": False,
        "vote_average": 7.1,
        "vote_count": 607
    }]
movies_rated = [(603692, 5), (385687, 2), (502356, 1)]
ratings = [4, 6, 1, 2]


# On construit la matrice d'utilité (approche item/item, model based)
# Exemple : {
# "genres": [ 28 :action,12 aventure,16 animation,35 comedy,80 crime,99 documentary,18 drama,10751 family,14 fantasy,36 history,
#            27 horror, 10402 music,9648 mystery, 10749 romance, 878 scifi,10770 TV movie, 53 Thriller, 10752 War,37 Western
# + dernière colonne avg rating
nb_genres = 19
id_genres = [28, 12, 16, 35, 80, 99, 18, 10751, 14, 36,
             27, 10402, 9648, 10749, 878, 10770, 53, 10752, 37]


# Matrice associée aux films, leurs caractéristiques : film en ligne, caractéristiques en colonne

def matrice_elements():
    n = len(all_movies)
    dico_film_id = {}
    res = np.zeros((n, nb_genres))  # +1
    for k in range(n):
        # associe un film_id à son indice dans all_movies
        dico_film_id[all_movies[k]["id"]] = k
        for i in range(nb_genres):
            if id_genres[i] in [all_movies[k]["genres"][l]["id"] for l in range(len(all_movies[k]["genres"]))]:
                res[k, i] = 1
        ##res[k, nb_genres] = all_movies[k]["vote_average"]
    return (res, dico_film_id)

# Vecteur associée à l'utilisateur : avec des notes (ou des films vus), mêmes colonnes que précédemment


def vecteur_user(notes_user, matrice_element, dico_film_id):
    # note user qui contient la note de l'utilisateur clé i rang du film dans all_movies
    res = np.zeros(nb_genres)  # +1
    note_moy_user = np.mean(notes_user)
    for k in range(nb_genres):  # +1
        compteur = 0
        for (film_id, rating) in notes_user:
            i = dico_film_id[film_id]
            if matrice_element[i, k] != 0:
                compteur += 1
                res[k] += rating-note_moy_user
        if compteur != 0:
            res[k] = res[k]/compteur
    return (res)

# Calcul de la recommendation :


def recommendation(vecteur_user, matrice_element):
    n = len(all_movies)
    x = vecteur_user
    res = np.zeros(n)
    for i in range(n):
        y = matrice_element[i]
        # y=matrice_element[i]
        norme_x = np.linalg.norm(x)
        norme_y = np.linalg.norm(y)
        if norme_x != 0 and norme_y != 0:
            res[i] = np.dot(x, y)/(norme_x*norme_y)
        else:
            res[i] = 0
        #(pairwise_distances( x, y, metric="cosine"), all_movies[i]["id"])
        recom = [(res[i], all_movies[i]["id"]) for i in range(n)]
    recom.sort(reverse=True)
    return (recom)

# coeur du code :


matrice_films, dico_film_id = matrice_elements()
vecteur = vecteur_user(movies_rated, matrice_films, dico_film_id)
recom = recommendation(vecteur, matrice_films)
print(recom)
