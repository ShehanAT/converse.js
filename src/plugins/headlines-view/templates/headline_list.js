import { html } from "lit";

const tpl_headline_feed = (el, feed) => {
    const open_title = __('Click to open this server message');
    return html`
        <div class="list-item controlbox-padded d-flex flex-row"
            data-headline-jid="${feed.get('jid')}">
        <a class="list-item-link open-headline available-room w-100"
            data-headline-jid="${feed.get('jid')}"
            title="${open_title}"
            @click=${ev => el.openHeadline(ev)}
            href="#">${feed.get('jid')}</a>
        </div>
    `;
}


export default (el) => {
    const feeds = el.model.filter(m => m.get('type') === _converse.HEADLINES_TYPE);
    return html`
        <div class="list-container list-container--headline ${ feeds.length ? '' : 'hidden' }">
            <div class="items-list rooms-list headline-list">
                ${ feeds.map(feed => tpl_headline_feed(el, feed)) }
            </div>
        </div>
    `;
}
