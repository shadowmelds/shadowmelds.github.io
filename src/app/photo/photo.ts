import {PHOTOS} from "../data/photos";
import {Photo} from "../data/photo";
import * as $ from '../res/js/jquery-3.6.0.min.js';

export class PhotosComponent {

    photos = PHOTOS;
    photo: Photo = null;
    isLoading = true;


    onInit(): void {
        (document.getElementById('dialog-preview') as HTMLDivElement).addEventListener('click', () => this.clearPhoto());
        this.updateHTML();
        this.imageView();
    }

    updateHTML(): void {
        let originImgX = document.getElementById('img_x');
        let parent = document.getElementById('img_wrap');

        for (let photo of this.photos) {
            let imgX = originImgX.cloneNode(true) as HTMLDivElement;
            (imgX.querySelector('img') as HTMLImageElement).src = photo.url;

            imgX.addEventListener('click', () => this.clickPhoto(photo));
            parent.appendChild(imgX);
        }
        originImgX.remove();
    }

    clickPhoto(photo: Photo): void {
        this.photo = photo;
        (document.getElementById('dialog-preview') as HTMLDivElement).classList.add('is-display');
        (document.getElementById('photo-preview') as HTMLImageElement).src = this.photo.url;
        (document.getElementById('photo-date') as HTMLParagraphElement).textContent = '拍摄日期：' + this.photo.date;
        (document.getElementById('photo-description') as HTMLParagraphElement).textContent = photo.description;
    }

    clearPhoto(): void {
        (document.getElementById('dialog-preview') as HTMLDivElement).classList.remove('is-display')
        this.photo = null;
    }

    getImageWidth(url, callback): void {
        const img = new Image();
        img.src = url;
        if (img.complete) {
            callback(img.width, img.height);
        } else {
            img.onload = () => {
                callback(img.width, img.height);
            };
        }
    }

    imgbox(obj, i): void {

        let width = (document.getElementById('img_wrap') as HTMLDivElement).clientWidth
        console.log('w' + width)
        const imgSrc = $(obj).find('img').attr('src');
        this.getImageWidth(imgSrc, (w, h) => {
            $(obj).find('i').css({'padding-bottom': h / w * 100 + '%'});
            $(obj).css({ flexGrow: (w * 100) / h, flexBasis: (w * (width * 0.3)) / h + 'px' });
            if (i === 1 && this.isLoading) {
                this.isLoading = false;
            }
        });
    }

    async imageView(): Promise<void> {

        const photoX = await this.asyncCheck(() => document.querySelector('.img_x'));

        const imgs = document.getElementById('img_wrap').getElementsByClassName('img_x');
        console.log(imgs.length);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < imgs.length; i++) {
            this.imgbox(imgs[i], imgs.length - i);
        }
    }

    asyncCheck = async<T> (getter: () => T, checkSize = 100, timeout = 1000) => {
        return new Promise<T>(x => {
            const check = (num = 0) => {
                const target = getter();
                if (target !== undefined && target !== null) {
                    x(target);
                } else if (num > timeout / checkSize) {// 超时
                    x(target);
                } else {
                    setTimeout(() => check(++num), checkSize);
                }
            };
            check();
        });
    }
}

init();

function init() {
    let photo = new PhotosComponent();
    photo.onInit()
}