import numpy as np
import sqlite3
con = sqlite3.connect(
    "C:/Users/ninog/EIrecommandation/centrale-ei-web/backend/database.sqlite3")

cur = con.cursor()
con.commit()

nb_genres = 19
id_genres = ['28', '12', '16', '35', '80', '99', '18', '10751', '14', '36',
             '27', '10402', '9648', '10749', '878', '10770', '53', '10752', '37']


def algo():

    # On suppose disposer de la liste des films notés par l'utilisateur [(film_id,rating)] movies_rated
    # On a la liste de tous les films de la plateforme all_movies (id, genres,avg_rate)
    # En sortie on a une liste des (score,film_id) triés par pertinence
    all_movies = cur.execute("SELECT id, genre_ids FROM movie").fetchall()
    movies_rated = cur.execute(
        "SELECT movieId FROM user_favoris_movie").fetchall()
    rating = [10 for film in movies_rated]

    matrice_films, dico_film_id = matrice_elements(all_movies)
    # Matrice associée aux films, leurs caractéristiques : film en ligne, caractéristiques en colonne
    vecteur = vecteur_user(movies_rated, matrice_films, dico_film_id)
    # Vecteur associée à l'utilisateur : avec des notes (ou des films vus), mêmes colonnes que précédemment
    # Calcul de la recommendation
    recom = recommendation(vecteur, matrice_films, all_movies)
    for i, movie in enumerate(recom):
        if i >= 30:
            break
        movieId = movie[1]
        score = movie[0]*100
        print(movieId)
        cur.execute(
            "INSERT INTO user_recommandations_movie (userId, movieId, score) VALUES (1, ?, ?)", (movieId, score,))
        con.commit()
        # on insert les 30 films les plus recommandés pour l'utilisateur dans la base relationnelle user_recommandations_movie
    return (recom)  # update la table


def matrice_elements(all_movies):
    n = len(all_movies)
    dico_film_id = {}
    res = np.zeros((n, nb_genres))
    for k in range(n):
        # associe un film_id à son indice dans all_movies
        dico_film_id[all_movies[k][0]] = k
        for i in range(nb_genres):
            if id_genres[i] in (all_movies[k][1]).split(','):
                res[k, i] = 1
    return (res, dico_film_id)


def vecteur_user(notes_user, matrice_element, dico_film_id):
    # note user qui contient la note de l'utilisateur clé i rang du film dans all_movies
    res = np.zeros(nb_genres)
    for k in range(nb_genres):
        compteur = 0
        for (film_id,) in notes_user:
            i = dico_film_id[film_id]
            if matrice_element[i, k] != 0:
                compteur += 1
                res[k] += 10
        if compteur != 0:
            res[k] = res[k]/compteur
    return (res)


def recommendation(vecteur_user, matrice_element, all_movies):
    n = len(all_movies)
    x = vecteur_user
    res = np.zeros(n)
    for i in range(n):
        y = matrice_element[i]
        norme_x = np.linalg.norm(x)
        norme_y = np.linalg.norm(y)
        if norme_x != 0 and norme_y != 0:
            res[i] = np.dot(x, y)/(norme_x*norme_y)
        else:
            res[i] = 0
        recom = [(res[i], all_movies[i][0]) for i in range(n)]
    recom.sort(reverse=True)
    return (recom)


algo()
