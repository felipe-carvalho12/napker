import React, { Component } from "react";
import { EditorState } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createMentionPlugin, { defaultSuggestionsFilter } from "draft-js-mention-plugin";
import { convertToRaw } from "draft-js";
import mentions from "./mentions";
import "draft-js-mention-plugin/lib/plugin.css";

export default class SimpleMentionEditor extends Component {
    constructor(props) {
        super(props);

        this.mentionPlugin = createMentionPlugin();
    }

    state = {
        editorState: EditorState.createEmpty(),
        suggestions: mentions
    };

    onChange = (editorState) => {
        this.setState({
            editorState
        });
    };

    onSearchChange = ({ value }) => {
        this.setState({
            suggestions: defaultSuggestionsFilter(value, mentions)
        });
    };

    onAddMention = () => {
        //get the selected element
    };

    focus = () => {
        this.editor.focus();
    };

    renderContentAsRawJs() {
        const contentState = this.state.editorState.getCurrentContent();
        const raw = convertToRaw(contentState);

        return JSON.stringify(raw, null, 2);
    }

    render() {
        const { MentionSuggestions } = this.mentionPlugin;
        const plugins = [this.mentionPlugin];

        return (
            <div onClick={this.focus}>
                <div
                    className="w-100 border-0 pb-0 c-primary-grey"
                    style={{ background: 'var(--theme-base-color)', padding: '10px', outline: 'none' }}
                >
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        plugins={plugins}
                        ref={(element) => this.editor = element}
                        placeholder={this.props.placeholder}
                    />
                    <MentionSuggestions
                        onSearchChange={this.onSearchChange}
                        suggestions={this.state.suggestions}
                        onAddMention={this.onAddMention}
                    />
                </div>
            </div>
        );
    }
}
