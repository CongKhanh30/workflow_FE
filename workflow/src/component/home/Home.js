import React from 'react';

const Home = () => {
    return (
        <div>
            <header className="main-header" id="header">
                <nav className="navbar navbar-expand-lg navbar-light" id="navbar">
                    {/*// <!-- Sidebar toggle button -->*/}
                    <button id="sidebar-toggler" className="sidebar-toggle">
                        <span className="sr-only">Toggle navigation</span>
                    </button>

                    <span className="page-title">dashboard</span>

                    <div className="navbar-right ">

                        {/*// <!-- search form -->*/}
                        <div className="search-form">
                            <form action="index.html" method="get">
                                <div className="input-group input-group-sm" id="input-group-search">
                                    <input type="text" autoComplete="off" name="query" id="search-input" className="form-control" placeholder="Search..." />
                                    <div className="input-group-append">
                                        <button className="btn" type="button">/</button>
                                    </div>
                                </div>
                            </form>
                            <ul className="dropdown-menu dropdown-menu-search">

                                <li className="nav-item">
                                    <a className="nav-link" href="index.html">Morbi leo risus</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="index.html">Dapibus ac facilisis in</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="index.html">Porta ac consectetur ac</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="index.html">Vestibulum at eros</a>
                                </li>

                            </ul>

                        </div>

                        <ul className="nav navbar-nav">
                            {/*// <!-- Offcanvas -->*/}
                            <li className="custom-dropdown">
                                <a className="offcanvas-toggler active custom-dropdown-toggler" data-offcanvas="contact-off" href="javascript:" >
                                    <i className="mdi mdi-contacts icon"></i>
                                </a>
                            </li>
                            <li className="custom-dropdown">
                                <button className="notify-toggler custom-dropdown-toggler">
                                    <i className="mdi mdi-bell-outline icon"></i>
                                    <span className="badge badge-xs rounded-circle">21</span>
                                </button>
                                <div className="dropdown-notify">

                                    <header>
                                        <div className="nav nav-underline" id="nav-tab" role="tablist">
                                            <a className="nav-item nav-link active" id="all-tabs" data-toggle="tab" href="#all" role="tab" aria-controls="nav-home"
                                               aria-selected="true">All (5)</a>
                                            <a className="nav-item nav-link" id="message-tab" data-toggle="tab" href="#message" role="tab" aria-controls="nav-profile"
                                               aria-selected="false">Msgs (4)</a>
                                            <a className="nav-item nav-link" id="other-tab" data-toggle="tab" href="#other" role="tab" aria-controls="nav-contact"
                                               aria-selected="false">Others (3)</a>
                                        </div>
                                    </header>

                                    <div className="" data-simplebar style={{height: "325px"}}>
                                        <div className="tab-content" id="myTabContent">

                                            <div className="tab-pane fade show active" id="all" role="tabpanel" aria-labelledby="all-tabs">

                                                <div className="media media-sm bg-warning-10 p-4 mb-0">
                                                    <div className="media-sm-wrapper">
                                                        <a href="user-profile.html">
                                                            <img src="images/user/user-sm-02.jpg" alt="User Image"/>
                                                        </a>
                                                    </div>
                                                    <div className="media-body">
                                                        <a href="user-profile.html">
                                                            <span className="title mb-0">John Doe</span>
                                                            <span className="discribe">Extremity sweetness difficult behaviour he of. On disposal of as landlord horrible. Afraid at highly months do things on at.</span>
                                                            <span className="time">
                                    <time>Just now</time>...
                                  </span>
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="media media-sm p-4 bg-light mb-0">
                                                    <div className="media-sm-wrapper bg-primary">
                                                        <a href="user-profile.html">
                                                            <i className="mdi mdi-calendar-check-outline"></i>
                                                        </a>
                                                    </div>
                                                    <div className="media-body">
                                                        <a href="user-profile.html">
                                                            <span className="title mb-0">New event added</span>
                                                            <span className="discribe">1/3/2014 (1pm - 2pm)</span>
                                                            <span className="time">
                                    <time>10 min ago...</time>...
                                  </span>
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="media media-sm p-4 mb-0">
                                                    <div className="media-sm-wrapper">
                                                        <a href="user-profile.html">
                                                            <img src="images/user/user-sm-03.jpg" alt="User Image"/>
                                                        </a>
                                                    </div>
                                                    <div className="media-body">
                                                        <a href="user-profile.html">
                                                            <span className="title mb-0">Sagge Hudson</span>
                                                            <span className="discribe">On disposal of as landlord Afraid at highly months do things on at.</span>
                                                            <span className="time">
                                    <time>1 hrs ago</time>...
                                  </span>
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="media media-sm p-4 mb-0">
                                                    <div className="media-sm-wrapper bg-info-dark">
                                                        <a href="user-profile.html">
                                                            <i className="mdi mdi-account-multiple-check"></i>
                                                        </a>
                                                    </div>
                                                    <div className="media-body">
                                                        <a href="user-profile.html">
                                                            <span className="title mb-0">Add request</span>
                                                            <span className="discribe">Add Dany Jones as your contact.</span>
                                                            <div className="buttons">
                                                                <a href="#" className="btn btn-sm btn-success shadow-none text-white">accept</a>
                                                                <a href="#" className="btn btn-sm shadow-none">delete</a>
                                                            </div>
                                                            <span className="time">
                                    <time>6 hrs ago</time>...
                                  </span>
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="media media-sm p-4 mb-0">
                                                    <div className="media-sm-wrapper bg-info">
                                                        <a href="user-profile.html">
                                                            <i className="mdi mdi-playlist-check"></i>
                                                        </a>
                                                    </div>
                                                    <div className="media-body">
                                                        <a href="user-profile.html">
                                                            <span className="title mb-0">Task complete</span>
                                                            <span className="discribe">Afraid at highly months do things on at.</span>
                                                            <span className="time">
                                    <time>1 hrs ago</time>...
                                  </span>
                                                        </a>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="tab-pane fade" id="message" role="tabpanel" aria-labelledby="message-tab">

                                                <div className="media media-sm p-4 mb-0">
                                                    <div className="media-sm-wrapper">
                                                        <a href="user-profile.html">
                                                            <img src="images/user/user-sm-01.jpg" alt="User Image"/>
                                                        </a>
                                                    </div>
                                                    <div className="media-body">
                                                        <a href="user-profile.html">
                                                            <span className="title mb-0">Selena Wagner</span>
                                                            <span className="discribe">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
                                                            <span className="time">
                                    <time>15 min ago</time>...
                                  </span>
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="media media-sm p-4 mb-0">
                                                    <div className="media-sm-wrapper">
                                                        <a href="user-profile.html">
                                                            <img src="images/user/user-sm-03.jpg" alt="User Image"/>
                                                        </a>
                                                    </div>
                                                    <div className="media-body">
                                                        <a href="user-profile.html">
                                                            <span className="title mb-0">Sagge Hudson</span>
                                                            <span className="discribe">On disposal of as landlord Afraid at highly months do things on at.</span>
                                                            <span className="time">
                                    <time>1 hrs ago</time>...
                                  </span>
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="media media-sm bg-warning-10 p-4 mb-0">
                                                    <div className="media-sm-wrapper">
                                                        <a href="user-profile.html">
                                                            <img src="images/user/user-sm-02.jpg" alt="User Image"/>
                                                        </a>
                                                    </div>
                                                    <div className="media-body">
                                                        <a href="user-profile.html">
                                                            <span className="title mb-0">John Doe</span>
                                                            <span className="discribe">Extremity sweetness difficult behaviour he of. On disposal of as landlord horrible. Afraid
                                    at highly months do things on at.</span>
                                                            <span className="time">
                                    <time>Just now</time>...
                                  </span>
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="media media-sm p-4 mb-0">
                                                    <div className="media-sm-wrapper">
                                                        <a href="user-profile.html">
                                                            <img src="images/user/user-sm-04.jpg" alt="User Image"/>
                                                        </a>
                                                    </div>
                                                    <div className="media-body">
                                                        <a href="user-profile.html">
                                                            <span className="title mb-0">Albrecht Straub</span>
                                                            <span className="discribe"> Beatae quia natus assumenda laboriosam, nisi perferendis aliquid consectetur expedita non tenetur.</span>
                                                            <span className="time">
                                    <time>Just now</time>...
                                  </span>
                                                        </a>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="tab-pane fade" id="other" role="tabpanel" aria-labelledby="contact-tab">

                                                <div className="media media-sm p-4 bg-light mb-0">
                                                    <div className="media-sm-wrapper bg-primary">
                                                        <a href="user-profile.html">
                                                            <i className="mdi mdi-calendar-check-outline"></i>
                                                        </a>
                                                    </div>
                                                    <div className="media-body">
                                                        <a href="user-profile.html">
                                                            <span className="title mb-0">New event added</span>
                                                            <span className="discribe">1/3/2014 (1pm - 2pm)</span>
                                                            <span className="time">
                                    <time>10 min ago...</time>...
                                  </span>
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="media media-sm p-4 mb-0">
                                                    <div className="media-sm-wrapper bg-info-dark">
                                                        <a href="user-profile.html">
                                                            <i className="mdi mdi-account-multiple-check"></i>
                                                        </a>
                                                    </div>
                                                    <div className="media-body">
                                                        <a href="user-profile.html">
                                                            <span className="title mb-0">Add request</span>
                                                            <span className="discribe">Add Dany Jones as your contact.</span>
                                                            <div className="buttons">
                                                                <a href="#" className="btn btn-sm btn-success shadow-none text-white">accept</a>
                                                                <a href="#" className="btn btn-sm shadow-none">delete</a>
                                                            </div>
                                                            <span className="time">
                                    <time>6 hrs ago</time>...
                                  </span>
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="media media-sm p-4 mb-0">
                                                    <div className="media-sm-wrapper bg-info">
                                                        <a href="user-profile.html">
                                                            <i className="mdi mdi-playlist-check"></i>
                                                        </a>
                                                    </div>
                                                    <div className="media-body">
                                                        <a href="user-profile.html">
                                                            <span className="title mb-0">Task complete</span>
                                                            <span className="discribe">Afraid at highly months do things on at.</span>
                                                            <span className="time">
                                    <time>1 hrs ago</time>...
                                  </span>
                                                        </a>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <footer className="border-top dropdown-notify-footer">
                                        <div className="d-flex justify-content-between align-items-center py-2 px-4">
                                            <span>Last updated 3 min ago</span>
                                            <a id="refress-button" href="javascript:" className="btn mdi mdi-cached btn-refress"></a>
                                        </div>
                                    </footer>
                                </div>
                            </li>
                            {/*// <!-- User Account -->*/}
                            <li className="dropdown user-menu">
                                <button className="dropdown-toggle nav-link" data-toggle="dropdown">
                                    <img src="images/user/user-xs-01.jpg" className="user-image rounded-circle" alt="User Image" />
                                    <span className="d-none d-lg-inline-block">John Doe</span>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li>
                                        <a className="dropdown-link-item" href="user-profile.html">
                                            <i className="mdi mdi-account-outline"></i>
                                            <span className="nav-text">My Profile</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-link-item" href="email-inbox.html">
                                            <i className="mdi mdi-email-outline"></i>
                                            <span className="nav-text">Message</span>
                                            <span className="badge badge-pill badge-primary">24</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-link-item" href="user-activities.html">
                                            <i className="mdi mdi-diamond-stone"></i>
                                            <span className="nav-text">Activitise</span></a>
                                    </li>
                                    <li>
                                        <a className="dropdown-link-item" href="user-account-settings.html">
                                            <i className="mdi mdi-settings"></i>
                                            <span className="nav-text">Account Setting</span>
                                        </a>
                                    </li>

                                    <li className="dropdown-footer">
                                        <a className="dropdown-link-item" href="sign-in.html"> <i className="mdi mdi-logout"></i> Log Out </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>


            </header>
            <div className="row">
                <aside className="left-sidebar sidebar-dark col-3" id="left-sidebar">
                    <div id="sidebar" className="sidebar sidebar-with-footer">
                        {/*// <!-- Aplication Brand -->*/}
                        <div className="app-brand">
                            <a href="/index.html">
                                <img src="images/logo.png" alt="Mono"/>
                                <span className="brand-name">MONO</span>
                            </a>
                        </div>
                        {/*// <!-- begin sidebar scrollbar -->*/}
                        <div className="sidebar-left" data-simplebar style={{height: "100%"}}>
                            {/*// <!-- sidebar menu -->*/}
                            <ul className="nav sidebar-inner" id="sidebar-menu">



                                <li
                                    className="active"
                                >
                                    <a className="sidenav-item-link" href="index.html">
                                        <i className="mdi mdi-briefcase-account-outline"></i>
                                        <span className="nav-text">Business Dashboard</span>
                                    </a>
                                </li>





                                <li
                                >
                                    <a className="sidenav-item-link" href="analytics.html">
                                        <i className="mdi mdi-chart-line"></i>
                                        <span className="nav-text">Analytics Dashboard</span>
                                    </a>
                                </li>





                                <li className="section-title">
                                    Apps
                                </li>





                                <li
                                >
                                    <a className="sidenav-item-link" href="chat.html">
                                        <i className="mdi mdi-wechat"></i>
                                        <span className="nav-text">Chat</span>
                                    </a>
                                </li>





                                <li
                                >
                                    <a className="sidenav-item-link" href="contacts.html">
                                        <i className="mdi mdi-phone"></i>
                                        <span className="nav-text">Contacts</span>
                                    </a>
                                </li>





                                <li
                                >
                                    <a className="sidenav-item-link" href="team.html">
                                        <i className="mdi mdi-account-group"></i>
                                        <span className="nav-text">Team</span>
                                    </a>
                                </li>





                                <li
                                >
                                    <a className="sidenav-item-link" href="calendar.html">
                                        <i className="mdi mdi-calendar-check"></i>
                                        <span className="nav-text">Calendar</span>
                                    </a>
                                </li>





                                <li  className="has-sub" >
                                    <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#email"
                                       aria-expanded="false" aria-controls="email">
                                        <i className="mdi mdi-email"></i>
                                        <span className="nav-text">email</span> <b className="caret"></b>
                                    </a>
                                    <ul  className="collapse"  id="email"
                                         data-parent="#sidebar-menu">
                                        <div className="sub-menu">



                                            <li >
                                                <a className="sidenav-item-link" href="email-inbox.html">
                                                    <span className="nav-text">Email Inbox</span>

                                                </a>
                                            </li>






                                            <li >
                                                <a className="sidenav-item-link" href="email-details.html">
                                                    <span className="nav-text">Email Details</span>

                                                </a>
                                            </li>






                                            <li >
                                                <a className="sidenav-item-link" href="email-compose.html">
                                                    <span className="nav-text">Email Compose</span>

                                                </a>
                                            </li>

                                        </div>
                                    </ul>
                                </li>

                                <li className="section-title">
                                    UI Elements
                                </li>


                                <li  className="has-sub" >
                                    <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#ui-elements"
                                       aria-expanded="false" aria-controls="ui-elements">
                                        <i className="mdi mdi-folder-outline"></i>
                                        <span className="nav-text">UI Components</span> <b className="caret"></b>
                                    </a>
                                    <ul  className="collapse"  id="ui-elements"
                                         data-parent="#sidebar-menu">
                                        <div className="sub-menu">

                                            <li >
                                                <a className="sidenav-item-link" href="alert.html">
                                                    <span className="nav-text">Alert</span>

                                                </a>
                                            </li>


                                            <li >
                                                <a className="sidenav-item-link" href="badge.html">
                                                    <span className="nav-text">Badge</span>

                                                </a>
                                            </li>

                                            <li >
                                                <a className="sidenav-item-link" href="breadcrumb.html">
                                                    <span className="nav-text">Breadcrumb</span>

                                                </a>
                                            </li>
                                            <li  className="has-sub" >
                                                <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#buttons"
                                                   aria-expanded="false" aria-controls="buttons">
                                                    <span className="nav-text">Buttons</span> <b className="caret"></b>
                                                </a>
                                                <ul  className="collapse"  id="buttons">
                                                    <div className="sub-menu">

                                                        <li >
                                                            <a href="button-default.html">Button Default</a>
                                                        </li>

                                                        <li >
                                                            <a href="button-dropdown.html">Button Dropdown</a>
                                                        </li>

                                                        <li >
                                                            <a href="button-group.html">Button Group</a>
                                                        </li>

                                                        <li >
                                                            <a href="button-social.html">Button Social</a>
                                                        </li>

                                                        <li >
                                                            <a href="button-loading.html">Button Loading</a>
                                                        </li>

                                                    </div>
                                                </ul>
                                            </li>


                                            <li >
                                                <a className="sidenav-item-link" href="card.html">
                                                    <span className="nav-text">Card</span>

                                                </a>
                                            </li>

                                            <li >
                                                <a className="sidenav-item-link" href="carousel.html">
                                                    <span className="nav-text">Carousel</span>

                                                </a>
                                            </li>

                                            <li >
                                                <a className="sidenav-item-link" href="collapse.html">
                                                    <span className="nav-text">Collapse</span>

                                                </a>
                                            </li>

                                            <li >
                                                <a className="sidenav-item-link" href="editor.html">
                                                    <span className="nav-text">Editor</span>

                                                </a>
                                            </li>

                                            <li >
                                                <a className="sidenav-item-link" href="list-group.html">
                                                    <span className="nav-text">List Group</span>

                                                </a>
                                            </li>



                                            <li >
                                                <a className="sidenav-item-link" href="modal.html">
                                                    <span className="nav-text">Modal</span>

                                                </a>
                                            </li>

                                            <li >
                                                <a className="sidenav-item-link" href="pagination.html">
                                                    <span className="nav-text">Pagination</span>

                                                </a>
                                            </li>

                                            <li >
                                                <a className="sidenav-item-link" href="popover-tooltip.html">
                                                    <span className="nav-text">Popover & Tooltip</span>

                                                </a>
                                            </li>


                                            <li >
                                                <a className="sidenav-item-link" href="progress-bar.html">
                                                    <span className="nav-text">Progress Bar</span>

                                                </a>
                                            </li>


                                            <li >
                                                <a className="sidenav-item-link" href="spinner.html">
                                                    <span className="nav-text">Spinner</span>

                                                </a>
                                            </li>


                                            <li >
                                                <a className="sidenav-item-link" href="switches.html">
                                                    <span className="nav-text">Switches</span>

                                                </a>
                                            </li>

                                            <li  className="has-sub" >
                                                <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#tables"
                                                   aria-expanded="false" aria-controls="tables">
                                                    <span className="nav-text">Tables</span> <b className="caret"></b>
                                                </a>
                                                <ul  className="collapse"  id="tables">
                                                    <div className="sub-menu">

                                                        <li >
                                                            <a href="bootstarp-tables.html">Bootstrap Tables</a>
                                                        </li>

                                                        <li >
                                                            <a href="data-tables.html">Data Tables</a>
                                                        </li>

                                                    </div>
                                                </ul>
                                            </li>

                                            <li >
                                                <a className="sidenav-item-link" href="tab.html">
                                                    <span className="nav-text">Tab</span>

                                                </a>
                                            </li>


                                            <li >
                                                <a className="sidenav-item-link" href="toaster.html">
                                                    <span className="nav-text">Toaster</span>

                                                </a>
                                            </li>

                                            <li  className="has-sub" >
                                                <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#icons"
                                                   aria-expanded="false" aria-controls="icons">
                                                    <span className="nav-text">Icons</span> <b className="caret"></b>
                                                </a>
                                                <ul  className="collapse"  id="icons">
                                                    <div className="sub-menu">

                                                        <li >
                                                            <a href="material-icons.html">Material Icon</a>
                                                        </li>

                                                        <li >
                                                            <a href="flag-icons.html">Flag Icon</a>
                                                        </li>

                                                    </div>
                                                </ul>
                                            </li>

                                            <li  className="has-sub" >
                                                <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#forms"
                                                   aria-expanded="false" aria-controls="forms">
                                                    <span className="nav-text">Forms</span> <b className="caret"></b>
                                                </a>
                                                <ul  className="collapse"  id="forms">
                                                    <div className="sub-menu">

                                                        <li >
                                                            <a href="basic-input.html">Basic Input</a>
                                                        </li>

                                                        <li >
                                                            <a href="input-group.html">Input Group</a>
                                                        </li>

                                                        <li >
                                                            <a href="checkbox-radio.html">Checkbox & Radio</a>
                                                        </li>

                                                        <li >
                                                            <a href="form-validation.html">Form Validation</a>
                                                        </li>

                                                        <li >
                                                            <a href="form-advance.html">Form Advance</a>
                                                        </li>

                                                    </div>
                                                </ul>
                                            </li>


                                            <li  className="has-sub" >
                                                <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#maps"
                                                   aria-expanded="false" aria-controls="maps">
                                                    <span className="nav-text">Maps</span> <b className="caret"></b>
                                                </a>
                                                <ul  className="collapse"  id="maps">
                                                    <div className="sub-menu">

                                                        <li >
                                                            <a href="google-maps.html">Google Map</a>
                                                        </li>

                                                        <li >
                                                            <a href="vector-maps.html">Vector Map</a>
                                                        </li>

                                                    </div>
                                                </ul>
                                            </li>


                                            <li  className="has-sub" >
                                                <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#widgets"
                                                   aria-expanded="false" aria-controls="widgets">
                                                    <span className="nav-text">Widgets</span> <b className="caret"></b>
                                                </a>
                                                <ul  className="collapse"  id="widgets">
                                                    <div className="sub-menu">

                                                        <li >
                                                            <a href="widgets-general.html">General Widget</a>
                                                        </li>

                                                        <li >
                                                            <a href="widgets-chart.html">Chart Widget</a>
                                                        </li>

                                                    </div>
                                                </ul>
                                            </li>



                                        </div>
                                    </ul>
                                </li>

                                <li  className="has-sub" >
                                    <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#charts"
                                       aria-expanded="false" aria-controls="charts">
                                        <i className="mdi mdi-chart-pie"></i>
                                        <span className="nav-text">Charts</span> <b className="caret"></b>
                                    </a>
                                    <ul  className="collapse"  id="charts"
                                         data-parent="#sidebar-menu">
                                        <div className="sub-menu">



                                            <li >
                                                <a className="sidenav-item-link" href="apex-charts.html">
                                                    <span className="nav-text">Apex Charts</span>

                                                </a>
                                            </li>

                                        </div>
                                    </ul>
                                </li>

                                <li className="section-title">
                                    Pages
                                </li>


                                <li  className="has-sub" >
                                    <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#users"
                                       aria-expanded="false" aria-controls="users">
                                        <i className="mdi mdi-image-filter-none"></i>
                                        <span className="nav-text">User</span> <b className="caret"></b>
                                    </a>
                                    <ul  className="collapse"  id="users"
                                         data-parent="#sidebar-menu">
                                        <div className="sub-menu">



                                            <li >
                                                <a className="sidenav-item-link" href="user-profile.html">
                                                    <span className="nav-text">User Profile</span>

                                                </a>
                                            </li>


                                            <li >
                                                <a className="sidenav-item-link" href="user-activities.html">
                                                    <span className="nav-text">User Activities</span>

                                                </a>
                                            </li>

                                            <li >
                                                <a className="sidenav-item-link" href="user-profile-settings.html">
                                                    <span className="nav-text">User Profile Settings</span>

                                                </a>
                                            </li>


                                            <li >
                                                <a className="sidenav-item-link" href="user-account-settings.html">
                                                    <span className="nav-text">User Account Settings</span>

                                                </a>
                                            </li>


                                            <li >
                                                <a className="sidenav-item-link" href="user-planing-settings.html">
                                                    <span className="nav-text">User Planing Settings</span>

                                                </a>
                                            </li>

                                            <li >
                                                <a className="sidenav-item-link" href="user-billing.html">
                                                    <span className="nav-text">User billing</span>

                                                </a>
                                            </li>

                                            <li >
                                                <a className="sidenav-item-link" href="user-notify-settings.html">
                                                    <span className="nav-text">User Notify Settings</span>

                                                </a>
                                            </li>

                                        </div>
                                    </ul>
                                </li>

                                <li  className="has-sub" >
                                    <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#authentication"
                                       aria-expanded="false" aria-controls="authentication">
                                        <i className="mdi mdi-account"></i>
                                        <span className="nav-text">Authentication</span> <b className="caret"></b>
                                    </a>
                                    <ul  className="collapse"  id="authentication"
                                         data-parent="#sidebar-menu">
                                        <div className="sub-menu">



                                            <li >
                                                <a className="sidenav-item-link" href="sign-in.html">
                                                    <span className="nav-text">Sign In</span>

                                                </a>
                                            </li>






                                            <li >
                                                <a className="sidenav-item-link" href="sign-up.html">
                                                    <span className="nav-text">Sign Up</span>

                                                </a>
                                            </li>






                                            <li >
                                                <a className="sidenav-item-link" href="reset-password.html">
                                                    <span className="nav-text">Reset Password</span>

                                                </a>
                                            </li>


                                        </div>
                                    </ul>
                                </li>





                                <li  className="has-sub" >
                                    <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#other-page"
                                       aria-expanded="false" aria-controls="other-page">
                                        <i className="mdi mdi-file-multiple"></i>
                                        <span className="nav-text">Other pages</span> <b className="caret"></b>
                                    </a>
                                    <ul  className="collapse"  id="other-page"
                                         data-parent="#sidebar-menu">
                                        <div className="sub-menu">



                                            <li >
                                                <a className="sidenav-item-link" href="invoice.html">
                                                    <span className="nav-text">Invoice</span>

                                                </a>
                                            </li>






                                            <li >
                                                <a className="sidenav-item-link" href="404.html">
                                                    <span className="nav-text">404 page</span>

                                                </a>
                                            </li>






                                            <li >
                                                <a className="sidenav-item-link" href="page-comingsoon.html">
                                                    <span className="nav-text">Coming Soon</span>

                                                </a>
                                            </li>






                                            <li >
                                                <a className="sidenav-item-link" href="page-maintenance.html">
                                                    <span className="nav-text">Maintenance</span>

                                                </a>
                                            </li>




                                        </div>
                                    </ul>
                                </li>





                                <li className="section-title">
                                    Documentation
                                </li>





                                <li
                                >
                                    <a className="sidenav-item-link" href="getting-started.html">
                                        <i className="mdi mdi-airplane"></i>
                                        <span className="nav-text">Getting Started</span>
                                    </a>
                                </li>





                                <li  className="has-sub" >
                                    <a className="sidenav-item-link" href="javascript:void(0)" data-toggle="collapse" data-target="#customization"
                                       aria-expanded="false" aria-controls="customization">
                                        <i className="mdi mdi-square-edit-outline"></i>
                                        <span className="nav-text">Customization</span> <b className="caret"></b>
                                    </a>
                                    <ul  className="collapse"  id="customization"
                                         data-parent="#sidebar-menu">
                                        <div className="sub-menu">



                                            <li >
                                                <a className="sidenav-item-link" href="navbar-customization.html">
                                                    <span className="nav-text">Navbar</span>

                                                </a>
                                            </li>






                                            <li >
                                                <a className="sidenav-item-link" href="sidebar-customization.html">
                                                    <span className="nav-text">Sidebar</span>

                                                </a>
                                            </li>






                                            <li >
                                                <a className="sidenav-item-link" href="styling.html">
                                                    <span className="nav-text">Styling</span>

                                                </a>
                                            </li>




                                        </div>
                                    </ul>
                                </li>



                            </ul>

                        </div>

                        <div className="sidebar-footer">
                            <div className="sidebar-footer-content">
                                <ul className="d-flex">
                                    <li>
                                        <a href="user-account-settings.html" data-toggle="tooltip" title="Profile settings"><i className="mdi mdi-settings"></i></a></li>
                                    <li>
                                        <a href="#" data-toggle="tooltip" title="No chat messages"><i className="mdi mdi-chat-processing"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </aside>
                <div className="col-9">

                    <header>
                        <div className="header-flex">
                            <span id="sidebar-button"><i className="fa fa-list"></i></span>
                            <h1 id="title" className="text-align-center">Kards</h1>
                            <span className="title-actions-container" style={{fontSize:"25px", cursor:'pointer', letterSpacing: "1ch"}}>
                    <label htmlFor="auto-save" className="auto-save-text">Auto Save</label>
                    <label className="switch" id="auto-save-label">
                       <input id="auto-save" type="checkbox" checked/>
                       <span className="slider round"></span>
                    </label>
                    <i title="Delete this board." id="delete-button" className="fa fa-trash"></i>
                    <i title="Save all boards." id="save-button" className="fa fa-floppy-o"></i>
                    <i title="Settings" id="settings-button" className="fa fa-gear"></i>
                </span>
                        </div>
                    </header>


                    <div id="sidebar" className="sidenav">
                        <span id="sidebar-close">&times;</span>
                        <p className="is-title">Boards</p>
                        <ul id="boards-list">
                            {/*// <!-- Boards will be listed here... -->*/}
                        </ul>

                        <div className="flex-col">
                            <input type="text" id="add-board-text" name="add-board" placeholder="Add Board..."/>
                            <button id="add-board-button">Add Board</button>
                        </div>
                    </div>

                    <div id="card-context-menu" className="context-menu">
                        {/*// <!-- Right-click context menu on cards. -->*/}
                        <ul>
                            <li id="card-context-menu-delete">Delete</li>
                            <li id="card-context-menu-clear">Clear</li>
                            <li id="card-context-menu-duplicate">Duplicate</li>
                        </ul>
                    </div>

                    <div className="container" id="main-container">
                        <div id="cards-container">
                            <div id="add-card">
                                <input maxLength="128" type="text" id="add-card-text" name="add-card" placeholder="Add Card..." autoFocus/>
                                <button id="add-card-button" className="plus-button">+</button>
                            </div>
                        </div>
                    </div>

                    <div id="alert-container">
                        <div id="alerts">
                            {/*// <!-- alerts go here -->*/}
                        </div>
                    </div>

                    <div id="confirm-dialog" className="modal">
                        <div className="dialog-content">
                            <span id="confirm-dialog-close" className="confirm-dialog-close">&times;</span>
                            <div id="confirm-dialog-text" className="confirm-dialog-text"></div>
                            <div className="confirm-dialog-actions">
                                <button id="confirm-dialog-cancel" className="confirm-dialog-cancel"> Cancel </button>
                                <button id="confirm-dialog-confirm" className="confirm-dialog-confirm"> Confirm </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Home;