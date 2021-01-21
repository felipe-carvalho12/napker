import React from 'react'

export default function SettingsContent(props) {
    const isMobile = visualViewport.width <= 635
    const title = props.title
    const mobileFontSize = "fs-" + (props.mobileFontSize ? String(props.mobileFontSize) : "29")
    const mobilePaddingBottom = props.mobilePaddingBottom !== undefined ? props.mobilePaddingBottom : true
    const padding = props.padding

    return (
        <div className={`settings-description-container justify-content-end ${isMobile && "blur"}`}>
            <div 
                className={`d-flex flex-column ${isMobile ? "b-t-l-r b-t-r-r b-theme-base-color blur mx-10px mt-10px b-a" : "b-t-r-r b-b-r-r b-theme-base-color w-100 h-100"}`}
                style={{ 
                    paddingTop: String(padding) + "px",
                    paddingRight: String(padding) + "px",
                    paddingLeft: String(padding) + "px",
                    paddingBottom: isMobile && mobilePaddingBottom ? "10vh" : padding && `p-${String(padding)}px`,
                    height: isMobile && '80vh'
                }}
            >
                {isMobile ? 
                    <div 
                        className={"d-flex justify-content-start align-items-center " + (padding ? `pt-${String(30-padding)}px pb-30px` : "p-30px")}
                    >
                        <i className="fas fa-arrow-left left-arrow-icon" onClick={() => window.history.back()} />
                        <h3 className={"c-primary-color m-0 fa-l" + mobileFontSize}>{title}</h3>
                    </div>
                    :
                    <h3 className={"c-primary-color " + (padding ? `px-${String(30-padding)}px pt-${String(30-padding)}px pb-30px` : "p-30px")}>
                        {title}
                    </h3>
                }  
                {props.children}
            </div>
        </div>
    )
}