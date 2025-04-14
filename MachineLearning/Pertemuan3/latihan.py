import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import nltk
from wordcloud import WordCloud
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

nltk.download('punkt')

df = pd.read_csv("C:/Materi_kuliahsmt4/MachineLearning/Pertemuan3/datasetclean.csv")
print (df.head())
print (df.tail())
print("Total : ", df.shape[0])
df.info()
df.describe()
print(df['sentiment'].value_counts())
print(df.columns)
print(df.isnull().sum())
df = df.dropna()
df.dropna(inplace=True)
print(df.duplicated().sum())
df = df.drop_duplicates()
df.drop_duplicates(inplace=True)
df.describe()
df['sentiment'].value_counts()
df['comment_length'] = df['comment'].apply(lambda x: len(str(x)))
plt.figure(figsize=(10, 5))
sns.histplot(df['comment_length'], bins=30, kde=True)
plt.xlabel("Panjang Komentar")
plt.ylabel("Frekuensi")
plt.title("Histogram Panjang Komentar")
plt.show()
df['text_length'] = df['comment_text'].apply(lambda x: len(str(x).split()))
sns.histplot(df['text_length'], bins=30)
plt.title("Distribusi Panjang Komentar")
plt.xlabel("Jumlah Kata per Komentar")
plt.show()
all_text = " ".join(comment for comment in df['comment'])
wordCloud = WordCloud(width=800, height=400, background_color='white').generate(all_text)
plt.figure(figsize=(10, 5))
plt.imshow(wordCloud, interpolation='bilinear')
plt.axis("off")
plt.show()