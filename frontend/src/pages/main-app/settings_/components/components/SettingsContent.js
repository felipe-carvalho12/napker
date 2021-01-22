import React from 'react'

export default function SettingsContent(props) {
    const isMobile = visualViewport.width <= 635
    const title = props.title
    const mobileFontSize = "fs-" + (props.mobileFontSize ? String(props.mobileFontSize) : "29") + " "
    const mobilePaddingBottom = props.mobilePaddingBottom !== undefined ? props.mobilePaddingBottom : true
    const padding = props.padding

    return (
        <div className={`settings-description-container justify-content-end ${isMobile && "blur-10px"}`}>
            <div 
                className={`d-flex flex-column ${isMobile ? "b-t-l-r b-t-r-r b-theme-base-color blur-20px mx-10px mt-10px b-a" : "b-t-r-r b-b-r-r b-theme-base-color w-100 h-100"}`}
                style={{ 
                    paddingTop: String(padding) + "px",
                    paddingRight: String(padding) + "px",
                    paddingLeft: String(padding) + "px",
                    paddingBottom: isMobile && mobilePaddingBottom ? "10vh" : padding && `p-${String(padding)}px`,
                    height: isMobile && '80vh'
                }}
            >
                {isMobile ? 
                    <>
                        <i  
                            className="material-icons-sharp c-primary-color fs-17" 
                            onClick={() => window.history.back()}
                            style={{ 
                                position: "absolute",
                                right: "10px", 
                                top: "10px"
                            }} 
                        >close</i>
                        <h3 className={"c-primary-color m-0 fa-l " + mobileFontSize + (padding ? `px-${String(30-padding)}px pt-${String(30-padding)}px pb-30px` : "p-30px")}>
                            {title}
                        </h3>
                    </>
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