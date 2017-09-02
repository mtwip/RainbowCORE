// ==UserScript==
// @name        RainbowCORE main Style
// @author      MarcusTuttle
// @namespace   https://www.MarcusTuttle.com
// @description This script contains the main styles for RainbowCORE.
// @include     https://relsvr.etq.com/*
// @version     1.1
// @grant    GM_addStyle
// @run-at document-start
// @exclude https://relsvr.etq.com/internal/reliance?ETQ$CMD=CMD_OPEN_ATTACHMENT&*
// ==/UserScript==

setTimeout(function(){


GM_addStyle (`

/*Changes the very top background color*/
.nav-bar {
	background-color: #5A839B !important;
}

/*Changes Tab bar color*/
#ExternalTabsBarDiv {background-color: #28526B !important;}

/*Changes the Active tab backgrounds and bottom border*/
#ExternalTabsBar li.ActiveAppTab, #ExternalTabsBar li.ActiveHomepageTab, #ExternalTabsBar li.ActiveDocumentTab {
	background-color: #28526B !important;
	border-bottom: 4px solid #F7FBFE !important;
}
/*Changes the background of the InActive document Tabs*/
#ExternalTabsBar li.InActiveAppTab, #ExternalTabsBar li.InActiveHomepageTab, #ExternalTabsBar li.InActiveDocumentTab {
	background-color: #28526B !important;
}

/*Changes the backgrounds of the applications Icons*/
#HomeApplicationsList li a #iconSpan {
    background-color: #F7FBFE !important;
}

/*Changes the bottom borders of the rows*/
.ColumnValue td, td.ColumnValue{
border-bottom: 1px solid black !important;
}

/*Reliance adds a background color on mouse over. This removes it.*/
.EvenViewRecord, .ColumnValue{
background-color: rgba(0,0,0,0) !important;
}
/*Sets the background for mouse over on the rows.*/
.EvenViewRecord:hover, .ColumnValue:hover{

background: linear-gradient(to bottom, #e1ffff 0%,#e1ffff 7%,#e1ffff 12%,#fdffff 12%,#e6f8fd 30%,#c8eefb 54%,#bee4f8 75%,#b1d8f5 100%) !important;
}

/*Changes the mail action background for the action bar*/
.action-bar .actions-container > .ToolbarAction > .MainAction:focus {
    background-color: #28526B !important;
}

/*changes the tool bar within documents*/
.toolbar {
	background-color: #28526B !important;
}

/*Changes background for the action bar*/
.action-bar{
	background-color: #28526B !important;
}

/*removes the border lines on the action bar*/
.action-bar .actions-container .ToolbarAction .MainAction, .secondLvlMenu a{
	border-right: none !important;
}

.tree-header{
	background-color: #28526B  !important;
}

a.treeAction{
	border-color:black !important;
}

.hvr-fade{
	background-color: #28526B  !important;
}

a.TreeItem:hover, a.TreeItem:focus, a.TreeItem:active{
	color: #5A839B !important;
}

#ViewNavigatorTree a.CurrentViewItem{
	color: #5A839B  !important;
}

a.CategoryTreeItem:hover, a.CategoryTreeItem:focus, a.CategoryTreeItem:active{
	color: #5A839B  !important;
}

.btn-blue, .FormButton, .SubformAddRecordLink{
	background-color: #5A839B !important;
	border-color:#5A839B !important;
}

.TabsBarMenu #ActiveExternalTab a{
	border:none !important;
}

.ToolbarSubAction .ToolbarAction .MainAction:focus,
.ToolbarAction .secondLvlMenu a:focus,
ActionMenu .ToolbarSubAction .ToolbarAction .MainAction:focus,
.ActionMenu .ToolbarSubAction .ToolbarAction .MainAction:focus,
.ActionMenu .ToolbarSubAction .ToolbarAction .MainAction:hover{
border-left: 5px solid #5A839B !important;
}

.top-menu-dropdown.left span:hover,
.top-menu-dropdown.right span:hover,
#OverflowedActionsMenu span.ToolbarAction:hover{
    border-left: 5px solid #5A839B !important;
}

#OverflowedActionsMenu img.pointer, li.ToolbarSubAction img.pointer{
	background-color: #5A839B !important;
}

.toolbar-action:hover,.toolbar-action:focus,.toolbar-action:active {
background-color: #5A839B !important;
}

/*change this class if you want to make changes to Customer Open Items*/
.CustomerOpen{
	font-weight: bold !important;
	color: white !important;

	/* Original Options
  https://media.giphy.com/media/URZcG7uLd9h4s/giphy.gif
	http://orig06.deviantart.net/9743/f/2011/241/f/7/rainbow_road_love_by_prguitarman-d487gss.gif
	https://m.popkey.co/26e430/Y0Joy.gif
  https://m.popkey.co/9fb99a/ZWGOr.gif
  https://www.parkettchannel.it/wp-content/uploads/unnamed8.gif
  */

	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9) !important;
}
/*change this class if you want to make changes to Customer Open Items*/
.CustomerOpen:hover{
	color:white !important;
  text-shadow: none !important;
 }

#PRIVACY_POLICY{
	display:none !important;
}
.breadcrumbs{
display:none !important;
}

`);
	
	
/******************************************************************************************************************
 ******************************************************************************************************************
	Everything below this is vital for RainbowCORE to work correctly. If you change these, things will break
 ******************************************************************************************************************		
*******************************************************************************************************************/
	
GM_addStyle (`

	/*1.1 - needed to display the colors correctly. Do not remove or change.  */
	.ColumnValue{display:none;}

	/* does fade in for login page*/
	.LoginPage{
			opacity: 0;
			-webkit-transition: opacity 2s ease-in;
			-moz-transition: opacity 2s ease-in;
			-o-transition: opacity 2s ease-in;
			-ms-transition: opacity 2s ease-in;
			transition: opacity 2s ease-in;
		 display: table !important;
		 width: 100% !important;
		 background:#040204 !important;
	}

	.show_login {
			opacity: 1 !important;
  }

	#ApplicationBody{
			opacity: 1 !important;
	}
	.load{
			opacity: 1 !important;
			-webkit-transition: opacity 1s ease-in;
			-moz-transition: opacity 1s ease-in;
			-o-transition: opacity 1s ease-in;
			-ms-transition: opacity 1s ease-in;
			transition: opacity 1s ease-in;
	}`);


}, 10);

