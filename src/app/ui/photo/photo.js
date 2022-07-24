"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotosComponent = void 0;
var $ = require("../../res/js/jquery-3.6.0.min.js");
var PhotosComponent = /** @class */ (function () {
    function PhotosComponent() {
        var _this = this;
        this.photo = null;
        this.isLoading = true;
        this.asyncCheck = function (getter, checkSize, timeout) {
            if (checkSize === void 0) { checkSize = 100; }
            if (timeout === void 0) { timeout = 1000; }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (x) {
                            var check = function (num) {
                                if (num === void 0) { num = 0; }
                                var target = getter();
                                if (target !== undefined && target !== null) {
                                    x(target);
                                }
                                else if (num > timeout / checkSize) { // 超时
                                    x(target);
                                }
                                else {
                                    setTimeout(function () { return check(++num); }, checkSize);
                                }
                            };
                            check();
                        })];
                });
            });
        };
    }
    PhotosComponent.prototype.onInit = function () {
        var _this = this;
        document.getElementById('dialog-preview').addEventListener('click', function () { return _this.clearPhoto(); });
        this.loadPhotos("/src/assets/json/photos.json");
    };
    PhotosComponent.prototype.loadPhotos = function (url) {
        var _this = this;
        var xmlHttp;
        if (window.XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        }
        else {
            console.log('浏览器不支持');
        }
        if (xmlHttp != null) {
            xmlHttp.open('get', url, true);
            // xmlHttp.responseType = 'json';
            xmlHttp.send();
            xmlHttp.onload = function () {
                if (xmlHttp.status === 200) {
                    _this.layoutPhotos(xmlHttp.responseText);
                }
            };
        }
    };
    PhotosComponent.prototype.layoutPhotos = function (json) {
        var _this = this;
        var photos = JSON.parse(json);
        var originImgX = document.getElementById('img_x');
        var parent = document.getElementById('img_wrap');
        var _loop_1 = function (photo) {
            var imgX = originImgX.cloneNode(true);
            imgX.querySelector('img').src = photos['baseUrl'] + photo.photoUrl;
            imgX.addEventListener('click', function () { return _this.clickPhoto({
                photoUrl: photos['baseUrl'] + photo.photoUrl,
                description: photo.description,
                date: photo.date
            }); });
            parent.appendChild(imgX);
        };
        for (var _i = 0, _a = photos['photos'].reverse(); _i < _a.length; _i++) {
            var photo = _a[_i];
            _loop_1(photo);
        }
        originImgX.remove();
        this.imageView();
    };
    PhotosComponent.prototype.clickPhoto = function (photo) {
        this.photo = photo;
        document.getElementById('dialog-preview').classList.add('is-display');
        document.getElementById('photo-preview').src = this.photo.photoUrl;
        document.getElementById('photo-date').textContent = '拍摄日期：' + this.photo.date;
        document.getElementById('photo-description').textContent = photo.description;
    };
    PhotosComponent.prototype.clearPhoto = function () {
        document.getElementById('dialog-preview').classList.remove('is-display');
        this.photo = null;
    };
    PhotosComponent.prototype.getImageWidth = function (url, callback) {
        var img = new Image();
        img.src = url;
        if (img.complete) {
            callback(img.width, img.height);
        }
        else {
            img.onload = function () {
                callback(img.width, img.height);
            };
        }
    };
    PhotosComponent.prototype.imgbox = function (obj, i) {
        var _this = this;
        var width = document.getElementById('img_wrap').clientWidth;
        console.log('w' + width);
        var imgSrc = $(obj).find('img').attr('src');
        this.getImageWidth(imgSrc, function (w, h) {
            $(obj).find('i').css({ 'padding-bottom': h / w * 100 + '%' });
            $(obj).css({ flexGrow: (w * 100) / h, flexBasis: (w * (width * 0.3)) / h + 'px' });
            if (i === 1 && _this.isLoading) {
                _this.isLoading = false;
            }
        });
    };
    PhotosComponent.prototype.imageView = function () {
        return __awaiter(this, void 0, void 0, function () {
            var photoX, imgs, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.asyncCheck(function () { return document.querySelector('.img_x'); })];
                    case 1:
                        photoX = _a.sent();
                        imgs = document.getElementById('img_wrap').getElementsByClassName('img_x');
                        console.log(imgs.length);
                        // tslint:disable-next-line:prefer-for-of
                        for (i = 0; i < imgs.length; i++) {
                            this.imgbox(imgs[i], imgs.length - i);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return PhotosComponent;
}());
exports.PhotosComponent = PhotosComponent;
init();
function init() {
    var photo = new PhotosComponent();
    photo.onInit();
}
//# sourceMappingURL=photo.js.map