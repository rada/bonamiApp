import {Page, NavController, NavParams, Modal} from 'ionic-angular';
import {ImageDetailPage} from '../image-detail/image-detail';
import {Money} from '../../pipes/price-pipe';
import {TimeLeft} from '../../pipes/time-left-pipe';
import {Translate} from '../../pipes/translate';


@Page({
	templateUrl: 'build/pages/product-detail/product-detail.html',
	pipes: [Money, TimeLeft, Translate]
})
export class ProductDetailPage {
	static get parameters() {
		return [[NavController], [NavParams]];
	}

	constructor(nav, params) {
		this.nav = nav;
		this.params = params;
		this.product = this.params.get("product");
		this.product.longTermCampaign = Math.floor(((+(new Date(this.product.campaignEndAt)) - Date.now()) / 86400000)) > 12;
	}

	// redirect to an external web (bonami.cz)
	redirect() {
		window.open(this.product.url, '_system', 'location=yes');
	}

	// open image slider
	showImageDetail(index) {
		let modal = Modal.create(ImageDetailPage, {product: this.product, index: index});
		this.nav.present(modal);
	}
}
