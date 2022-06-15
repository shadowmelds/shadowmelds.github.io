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
exports.JumpIconsComponent = void 0;
var JumpIconsComponent = /** @class */ (function () {
    function JumpIconsComponent() {
        var _this = this;
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
    JumpIconsComponent.prototype.onInit = function () {
        this.socialList();
        this.pathColor();
        this.updateHTML();
    };
    JumpIconsComponent.prototype.updateHTML = function () {
        var socialLogoElement = document.getElementById('social-logo-layout');
        var parent = document.getElementById('flex-horizontal');
        for (var _i = 0, _a = this.social; _i < _a.length; _i++) {
            var value = _a[_i];
            var socialLogo = socialLogoElement.cloneNode(true);
            socialLogo.querySelector('#icon').href = value.url;
            socialLogo.querySelector('.social-logo').src = value.icon;
            parent.appendChild(socialLogo);
        }
        socialLogoElement.remove();
    };
    JumpIconsComponent.prototype.socialList = function () {
        this.social = [
            { name: 'Twitter', url: 'https://twitter.com/Googleyeahs', icon: '/src/assets/icons/twitter.svg' },
            { name: 'Instagram', url: 'https://www.instagram.com/andrewmartin791/', icon: '/src/assets/icons/instagram.svg' },
            { name: 'Coolapk', url: 'http://www.coolapk.com/u/620606', icon: '/src/assets/icons/coolapk.svg' },
            { name: 'PlayStore', url: 'https://play.google.com/store/apps/dev?id=6609504255163731953', icon: '/src/assets/icons/bxl-play-store.svg' },
            { name: 'QQ', url: 'tencent://Message/?Uin=2530767709&websiteName=q-zone.qq.com&Menu=yes', icon: '/src/assets/icons/qq.svg' },
            { name: 'Github', url: 'https://github.com/shadowmelds', icon: '/src/assets/icons/github.svg' },
            { name: '网易云音乐', url: 'https://music.163.com/#/user/home?id=280851189', icon: '/src/assets/icons/music163.svg' }
        ];
    };
    JumpIconsComponent.prototype.pathColor = function () {
        return __awaiter(this, void 0, void 0, function () {
            var path, paths, style, sheet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.asyncCheck(function () { return document.querySelector('path'); })];
                    case 1:
                        path = _a.sent();
                        paths = document.querySelectorAll('path');
                        style = document.createElement('style');
                        document.head.appendChild(style);
                        sheet = style.sheet;
                        // tslint:disable-next-line:prefer-for-of
                        sheet.insertRule('.social-logo:hover path{fill: white;}');
                        return [2 /*return*/];
                }
            });
        });
    };
    return JumpIconsComponent;
}());
exports.JumpIconsComponent = JumpIconsComponent;
//# sourceMappingURL=jump-icons.js.map