import React, { Component } from "react";

import { EditorState, ContentState, convertToRaw, convertFromRaw } from "draft-js";
import { ItalicButton, BoldButton, UnderlineButton } from "@draft-js-plugins/buttons";
import Editor from "draft-js-plugins-editor";

import createMentionPlugin, { defaultSuggestionsFilter } from "draft-js-mention-plugin";
import createHashtagPlugin from "draft-js-hashtag-plugin";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import createEmojiPlugin from "draft-js-emoji-plugin"

import "draft-js-hashtag-plugin/lib/plugin.css";

import { SERVER_URL } from '../../../../../../../../config/settings'
import { mentionTheme, hashtagTheme, inlineToolbarTheme, emojiTheme } from './themes/index'
import StrongMention from './components/StrongMention'
import LinkMention from './components/LinkMention'

export default class SimpleMentionEditor extends Component {
    constructor(props) {
        super(props);

        this.mentionPlugin = createMentionPlugin({
            mentionPrefix: '@',
            mentionComponent: this.props.editable ? StrongMention : LinkMention,
            theme: mentionTheme
        });

        this.hashtagPlugin = createHashtagPlugin({
            theme: hashtagTheme
        });

        this.inlineToolbarPlugin = createInlineToolbarPlugin({
            theme: inlineToolbarTheme
        });

        this.emojiPlugin = createEmojiPlugin({
            theme: emojiTheme,
            selectButtonContent: (
                <i className="far fa-smile icon smile m-0" />
            )
        })
    }

    state = {
        editorState: this.props.postContent ? EditorState.createWithContent(convertFromRaw(this.props.postContent)) : EditorState.createEmpty(),
        mentions: null,
        suggestions: []
    };

    onChange = (editorState) => {
        this.setState({
            editorState
        });
        if (this.props.editable) {
            this.props.setContentLength(editorState.getCurrentContent().getPlainText().length)
            this.props.setPostContent(this.renderContentAsRawJs())
        }
    };

    onSearchChange = ({ value }) => {
        this.state.mentions ?
            this.setState({
                suggestions: defaultSuggestionsFilter(value, this.state.mentions).slice(0, 6)
            })
            :
            this.fetchMentions()
    };

    fetchMentions = () => {
        fetch(`${SERVER_URL}/post-api/get-mentions`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    mentions: data,
                    suggestions: data.slice(0, 6)
                })
            })
    }

    onAddMention = mention => {
        this.props.addTaggedUsernames(mention.name)
    };

    focus = () => {
        this.editor.focus();
    };

    renderContentAsRawJs() {
        const contentState = this.state.editorState.getCurrentContent();
        const raw = convertToRaw(contentState);

        return JSON.stringify(raw);
    }

    componentDidMount() {
        if (this.props.editable) {
            const { EmojiSelect } = this.emojiPlugin;
            !this.props.emojiSelector && this.props.setEmojiSelector(<EmojiSelect />);
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.shouldClearEditor) {
            const editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''));
            this.setState({ editorState });
        }
    }

    render() {
        const plugins = [this.mentionPlugin, this.hashtagPlugin, this.inlineToolbarPlugin, this.emojiPlugin];

        const { MentionSuggestions } = this.mentionPlugin;
        const { InlineToolbar } = this.inlineToolbarPlugin;
        const { EmojiSuggestions } = this.emojiPlugin;

        return (
            <div className="w-100" style={{ textAlign: 'start' }} onClick={this.focus}>
                <div
                    className="border-0 pb-0 c-primary-grey post-textbox"
                    style={{ width: '90%', padding: '10px', outline: 'none' }}
                >
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        plugins={plugins}
                        ref={(element) => this.editor = element}
                        placeholder={this.props.placeholder !== undefined ? this.props.placeholder : ''}
                        readOnly={!this.props.editable}
                    />
                </div>
                {this.props.editable &&
                    <>
                        <InlineToolbar>
                            {(externalProps) => (
                                <div>
                                    <BoldButton {...externalProps} />
                                    <ItalicButton {...externalProps} />
                                    <UnderlineButton {...externalProps} />
                                </div>
                            )}
                        </InlineToolbar>
                        <MentionSuggestions
                            onSearchChange={this.onSearchChange}
                            suggestions={this.state.suggestions}
                            onAddMention={this.onAddMention}
                        />
                        <EmojiSuggestions />
                    </>
                }
            </div>
        );
    }
}
