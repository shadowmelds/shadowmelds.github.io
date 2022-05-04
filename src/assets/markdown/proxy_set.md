# 各种常用开发软件设置代理

### git 设置和取消代理

```
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy https://127.0.0.1:7890

git config --global --unset http.proxy
git config --global --unset https.proxy
```

---

### nodeJS 设置和取消代理

```
npm config set proxy http://127.0.0.1:7890
npm config set https-proxy http://127.0.0.1:7890

取消代理
npm config delete proxy
npm config delete https-proxy
或者
npm config set proxy null
npm config set https-proxy null
```

---

### curl 设置代理

```
curl -x http://127.0.0.1:7890 https://www.google.com
```

### Gradle 设置代理

```
systemProp.http.proxyHost=127.0.0.1
systemProp.http.proxyPort=7890
systemProp.https.proxyHost=127.0.0.1
systemProp.https.proxyPort=7890
```