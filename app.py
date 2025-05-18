from flask import Flask,render_template
from collections import Counter
import sqlite3
import re

app = Flask(__name__)


@app.route('/')
def index():  # put application's code here
    infos =[]
    con = sqlite3.connect("NEWmovie250.db")
    cur = con.cursor()
    sql = "select * from movieTop250 limit 0,11"
    data = cur.execute(sql)
    for item in data:
        infos.append(item)
    cur.close()
    con.close()
    return render_template("index.html", infos=infos)

@app.route('/ranking')
def ranking():  # put application's code here
    infos = []
    con = sqlite3.connect("NEWmovie250.db")
    cur = con.cursor()
    sql = "select * from movieTop250 limit 0,251"
    data = cur.execute(sql)
    for item in data:
        infos.append(item)
    cur.close()
    con.close()
    return render_template('Ranking.html',infos=infos)

@app.route('/visualization')
def vis():
    #对评分进行计数***********************************************************************
    scores=[]
    num1=[]
    con = sqlite3.connect("NEWmovie250.db")
    cur = con.cursor()
    sql1 ="select 评分,count(评分) from movieTop250 group by 评分"
    data1 = cur.execute(sql1)
    for item in data1:
        scores.append(item[0])
        num1.append(item[1])

    #对评分进行排序
    sort_scores=[]
    sql1_1="SELECT * FROM movieTop250 ORDER BY 评分 DESC limit 0,20"
    data1_1 = cur.execute(sql1_1)
    for sort_score in data1_1:
        sort_scores.append(sort_score)

    #统计年份********************************************************************************
    years = []
    num2 = []
    sql2 = "select 年份,count(年份) from movieTop250 group by 年份"
    data2 = cur.execute(sql2)
    for item1 in data2:
        years.append(item1[0])
        num2.append(item1[1])

    #统计国家数量********************************************************************************
    con = sqlite3.connect("NEWmovie250.db")
    cur = con.cursor()
    raw_countries = []
    num3 = []
    sql3 = "select 国家,count(国家) from movieTop250 group by 国家"
    data3 = cur.execute(sql3)
    for item2 in data3:
        raw_countries.append(item2[0])

    all_countries = []
    for country_str in raw_countries:
        # 1. 去除\xa0和首尾空格
        cleaned = country_str.replace('\xa0', '').strip()
        # 2. 按空格分割成独立国家
        countries = cleaned.split()
        # 3. 添加到总列表
        all_countries.extend(countries)
    # 统计国家频次
    country_counter = Counter(all_countries)
    # 转换为排序后的列表
    sorted_countries = sorted(country_counter.items(), key=lambda x: x[1], reverse=True)

    # 分离国家和频次
    countries_list = [item[0] for item in sorted_countries]
    counts_list = [item[1] for item in sorted_countries]

    #统计类型数量**********************************************************************************
    con = sqlite3.connect("NEWmovie250.db")
    cur = con.cursor()
    raw_genres = []

    sql4 = "select 电影类型,count(电影类型) from movieTop250 group by 电影类型"
    data4 = cur.execute(sql4)
    for item3 in data4:
        raw_genres.append(item3[0])

    all_genres = []
    for genre_str in raw_genres:
        # 1. 去除\xa0和首尾空格
        cleaned = genre_str.replace('\xa0', '').strip()
        # 2. 按空格分割成独立国家
        genres = cleaned.split()
        # 3. 添加到总列表
        all_genres.extend(genres)
    # 统计国家频次
    genres_counter = Counter(all_genres)
    # 转换为排序后的列表
    sorted_genres = sorted(genres_counter.items(), key=lambda x: x[1], reverse=True)

    # 分离国家和频次
    genres_list = [item[0] for item in sorted_genres]
    genres_counter_list = [item[1] for item in sorted_genres]


#统计导演*******************************************************************
    con = sqlite3.connect("NEWmovie250.db")
    cur = con.cursor()
    raw_director = []


    sql4 = "select 导演 from movieTop250"

    data5 = cur.execute(sql4)
    for item4 in data5:
        raw_director.append(item4[0])

    # 统计国家频次
    director_counter = Counter(raw_director)
    sorted_director = sorted(director_counter.items(), key=lambda x: x[1], reverse=True)
    # 分离国家和频次
    director_list = [item[0] for item in sorted_director][0:10]
    director_counter_list = [item[1] for item in sorted_director][0:10]

    cur.close()
    con.close()
    return render_template("vis.html",scores=scores,num1=num1,sort_scores=sort_scores,years=years,num2=num2,
                           countries_list=countries_list,counts_list=counts_list,
                           genres_list=genres_list,genres_counter_list=genres_counter_list,
                           director_list=director_list,director_counter_list=director_counter_list)

if __name__ == '__main__':
    app.run()

