import tpl_headline_panel from './templates/panel.js';
import { CustomElement } from 'shared/components/element.js';
import { _converse, api } from '@converse/headless/core';

/**
 * Custom element which renders a list of headline feeds
 * @class
 * @namespace _converse.HeadlinesFeedList
 * @memberOf _converse
 */
export class HeadlinesFeedList extends CustomElement {

    initialize () {
        this.model = _converse.chatboxes;
        this.listenTo(this.model, 'add', () => this.renderIfHeadline());
        this.listenTo(this.model, 'remove', () => this.renderIfHeadline());
        this.listenTo(this.model, 'destroy', () => this.renderIfHeadline());
        this.render();
    }

    render () {
        return tpl_headline_panel(this);
    }

    renderIfHeadline (model) {
        return model?.get('type') === _converse.HEADLINES_TYPE && this.requestUpdate();
    }

    async openHeadline (ev) { // eslint-disable-line class-methods-use-this
        ev.preventDefault();
        const jid = ev.target.getAttribute('data-headline-jid');
        const feed = await api.headlines.get(jid);
        feed.maybeShow(true);
    }
}

api.elements.define('converse-headlines-feeds-list', HeadlinesFeedList);

// BBB: Deprecated
api.elements.define('converse-headlines-panel', HeadlinesFeedList);
