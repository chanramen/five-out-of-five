import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

class ShareRepository {

    async shareHtmlAsImage(htmlTarget: HTMLElement) {
        let result = await domtoimage.toBlob(htmlTarget)
        let file = new File([result], "review.png", {type: "image/png"})
        let fileArrayToShare = [file];
        // @ts-ignore
        if (navigator.canShare && navigator.canShare({files: fileArrayToShare})) {
            // @ts-ignore
            await navigator.share({files: fileArrayToShare})
        } else {
            saveAs(result, "review.png")
        }
    }

    async shareHtmlTargetById(target: string) {
        let targetHtml = document.getElementById(target);
        if (targetHtml !== null) {
            await this.shareHtmlAsImage(targetHtml)
        }
    }
}

export default ShareRepository