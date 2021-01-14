import React, { Component } from "react";

import { EditorState, convertToRaw } from "draft-js";
import { ItalicButton, BoldButton, UnderlineButton } from "@draft-js-plugins/buttons";
import Editor from "draft-js-plugins-editor";

import createMentionPlugin, { defaultSuggestionsFilter } from "draft-js-mention-plugin";
import createHashtagPlugin from "draft-js-hashtag-plugin";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import createEmojiPlugin from "draft-js-emoji-plugin"

import "draft-js-hashtag-plugin/lib/plugin.css";

import { SERVER_URL } from '../../../../../../../../config/settings'
import MentionComponent from './components/MentionComponent'

export default class SimpleMentionEditor extends Component {
    constructor(props) {
        super(props);

        this.mentionPlugin = createMentionPlugin({
            mentionPrefix: '@',
            mentionComponent: MentionComponent,
            theme: {
                mention: "mention",
                mentionSuggestions: "mentionSuggestions",
                mentionSuggestionsEntry: "mentionSuggestionsEntry",
                mentionSuggestionsEntryFocused: "mentionSuggestionsEntryFocused",
                mentionSuggestionsEntryText: "mentionSuggestionsEntryText",
                mentionSuggestionsEntryAvatar: "mentionSuggestionsEntryAvatar"
            }
        });

        this.hashtagPlugin = createHashtagPlugin({
            theme: {
                hashtag: 'hashtag'
            }
        });

        this.inlineToolbarPlugin = createInlineToolbarPlugin({
            theme: {
                toolbarStyles: {
                    toolbar: 'inline-toolbar',
                },
                buttonStyles: {
                    button: 'inline-toolbar-button',
                    buttonWrapper: 'inline-toolbar-button-wrapper',
                    active: 'inline-toolbar-button-active',
                },
            }
        });

        this.emojiPlugin = createEmojiPlugin({
            theme: {
                emoji: 'emoji',
                emojiSuggestions: 'emojiSuggestions',
                emojiSuggestionsEntry: 'emojiSuggestionsEntry',
                emojiSuggestionsEntryFocused: 'emojiSuggestionsEntryFocused',
                emojiSuggestionsEntryText: 'emojiSuggestionsEntryText',
                emojiSuggestionsEntryIcon: 'emojiSuggestionsEntryIcon',
                emojiSelect: 'emojiSelect',
                emojiSelectButton: 'emojiSelectButton',
                emojiSelectButtonPressed: 'emojiSelectButtonPressed',
                emojiSelectPopover: 'emojiSelectPopover',
                emojiSelectPopoverClosed: 'emojiSelectPopoverClosed',
                emojiSelectPopoverTitle: 'emojiSelectPopoverTitle',
                emojiSelectPopoverGroups: 'emojiSelectPopoverGroups',
                emojiSelectPopoverGroup: 'emojiSelectPopoverGroup',
                emojiSelectPopoverGroupTitle: 'emojiSelectPopoverGroupTitle',
                emojiSelectPopoverGroupList: 'emojiSelectPopoverGroupList',
                emojiSelectPopoverGroupItem: 'emojiSelectPopoverGroupItem',
                emojiSelectPopoverToneSelect: 'emojiSelectPopoverToneSelect',
                emojiSelectPopoverToneSelectList: 'emojiSelectPopoverToneSelectList',
                emojiSelectPopoverToneSelectItem: 'emojiSelectPopoverToneSelectItem',
                emojiSelectPopoverEntry: 'emojiSelectPopoverEntry',
                emojiSelectPopoverEntryFocused: 'emojiSelectPopoverEntryFocused',
                emojiSelectPopoverEntryIcon: 'emojiSelectPopoverEntryIcon',
                emojiSelectPopoverNav: 'emojiSelectPopoverNav',
                emojiSelectPopoverNavItem: 'emojiSelectPopoverNavItem',
                emojiSelectPopoverNavEntry: 'emojiSelectPopoverNavEntry',
                emojiSelectPopoverNavEntryActive: 'emojiSelectPopoverNavEntryActive',
                emojiSelectPopoverScrollbarOuter: 'emojiSelectPopoverScrollbarOuter',
                emojiSelectPopoverScrollbar: 'emojiSelectPopoverScrollbar',
                emojiSelectPopoverScrollbarThumb: 'emojiSelectPopoverScrollbarThumb'
            },
            selectButtonContent: (
                <i className="far fa-smile icon smile m-0" />
            )
        })
    }

    state = {
        editorState: EditorState.createEmpty(),
        mentions: null,
        suggestions: []
    };

    onChange = (editorState) => {
        if (editorState.getCurrentContent().getPlainText().length <= this.props.maxLength) {
            this.setState({
                editorState
            });
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
        const { EmojiSelect } = this.emojiPlugin;
        !this.props.emojiSelector && this.props.setEmojiSelector(<EmojiSelect />);
    }

    render() {
        const plugins = [this.mentionPlugin, this.hashtagPlugin, this.inlineToolbarPlugin, this.emojiPlugin];

        const { MentionSuggestions } = this.mentionPlugin;
        const { InlineToolbar } = this.inlineToolbarPlugin;
        const { EmojiSuggestions } = this.emojiPlugin;

        return (
            <div className="w-100" style={{ textAlign: 'start' }} onClick={this.focus}>
                <div
                    className="border-0 pb-0 c-primary-grey b-theme-base-color"
                    style={{ width: '90%', padding: '10px', outline: 'none' }}
                >
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        plugins={plugins}
                        ref={(element) => this.editor = element}
                        placeholder={this.props.placeholder}
                    />
                </div>
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
            </div>
        );
    }
}
