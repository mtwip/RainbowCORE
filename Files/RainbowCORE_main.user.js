// ==UserScript==
// @name        RainbowCOREmain
// @author      MarcusTuttle
// @namespace   https://www.MarcusTuttle.com
// @description This script contains the main functions for RainbowCORE.
// @include     https://relsvr.etq.com/*
// @version     1.0
// @grant    GM_addStyle
// @require https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js
// ==/UserScript==


this.$ = this.jQuery = jQuery.noConflict(true); //allows all of this to work without breaking Reliance


/******************************************************************************************************************
	Supported Views in HelpDesk.
		This script focuses on runs only on the listed views. If at any point the view names are changed on the 
		Help Desk, nothing will run. 

		Issues will also start happening if column names are changed, removed, or rearranged.
		
		"All Tickets"
		"Pending Tickets"

*******************************************************************************************************************/


/******************************************************************************************************************
	Variables Block Start. Change these to Customize Settings.
*******************************************************************************************************************/

//Limit Subject characters - Set to -1 if you would like to not use this
var SUBJECT_LIMIT = 50;

//Center Status - set to true or false if you would like to center the status text 
var STATUS_CENTER = true;

//Center Modified date fields and remove seconds
var DATE_SEC_REMOVE = true;

//Bold Ticket Numbers
var BOLD_TICKET_NUM = true;



/******************************************************************************************************************
	Background Changes
	
	 When changing and adding the options for the conditions to change the backgrounds, there are only three 
	 attributes that have been tested and confirmed to work. 
	  1: url('SOURCE URL'), 
		2: linear-gradient(direction, color-stop1, color-stop2, ...)
		3: radial-gradient(shape size at position, start-color, ..., last-color)
		
		These is because of how Reliance does it's own mouse overs and jQuery Limitations.
		
		To change the Background of a row, to an image... 
		"CHOICE" : "url('https://www.marcustuttle.com/Rainbow_smooth_small.gif')"
		
		To change the Background of row to one color...
		linear-gradient(up, #b06ab3,#b06ab3)
		
		You can also use both the gradients like they were made and make gradient backgrounds...
		linear-gradient(to right, #4568dc, #b06ab3)
		radial-gradient(circle, ,yellow, #f06d06)
		
		There are many tutorials online, as well as generators. Just be sure to only use the radial-gradient or the 
		linear-gradient attributes, and NOT the -webkit, -moz, or -o gradients.
		
		Here is a Final Example using Status options
		var STATUS_OPTIONS = {
			"Open": "url('https://www.marcustuttle.com/Rainbow_small.gif')",
			"Awaiting Customer Response": "linear-gradient(up, #b06ab3,#b06ab3)",
			"Closed": "linear-gradient(to right, #4568dc, #b06ab3)"
	  };
		
		
*******************************************************************************************************************/


/******************************************************************************************************************
	CONDITION_PRIORTY

		Since there are different ways to conditionally set the background of a row, a priority must be chosen.

		For example, assume the priority is ["Status","Type","Do_not_contact","Modified_Date"]

		The background images will first change based on the Status, then overwritten based on the Type, then 
		overwritten based on the "Do not contact customer directly", and then overwritten based on 
		the Modified Date Conditions.

		If you wish not to use any of these conditions, go to the related condition below and set the related 
		variable to false. 
*******************************************************************************************************************/
	var CONDITION_PRIORTY = ["Status","Type","Do_not_contact","Modified_Date","Last_Update_By"];


/******************************************************************************************************************
	Status Conditions
*******************************************************************************************************************/

	//set this to be true or false if you would like to change the background images based on Status.
	var STATUS_OPTIONS_BOOL = true;

	//Status options and their background images. For no value use an empty string:  ""
	var STATUS_OPTIONS = {
		"Open": "linear-gradient(to bottom, #ff1a00 0%,#ff1a00 100%)",
		"Awaiting Customer Response": "linear-gradient(to bottom, #A0D9FF 0%,#A0D9FF 100%)",
		"Closed": "linear-gradient(to bottom, #b8bac6 1%,#dddfe3 100%)"
	};

	//Change "Awaiting Customer Response" to be "Awaiting Customer". Status Background images must be used for this
	var ACR_SHORT = true;

/******************************************************************************************************************
	Type Conditions
*******************************************************************************************************************/

	//set this to be true or false if you would like to change the background images based on Ticket Type.
	var TYPE_OPTIONS_BOOL = true;

	//Type options and their background images. For no value use an empty string:  ""
	var TYPE_OPTIONS = {
		"Inquiry": "",
		"Service Request": "linear-gradient(to bottom, #cdeb8e 0%,#a5c956 100%)",
		"Issue": "",
		"Upgrade Feedback": "",
		"Promotion Feedback": "",
		"Performance": "",
		"IT Cloud Issue": "linear-gradient(to bottom, #cdeb8e 0%,#a5c956 100%)",
		"eValidator Issue": "",
		"Mobile Issue": ""
	};


/******************************************************************************************************************
	"Do not contact customer directly" Conditions
*******************************************************************************************************************/

	//Set this to be true or false if you would like to change the background images based on the 
	//"Do not contact customer directly" value
	var DO_NOT_CONTACT_BOOL = true;

	//Type options and their background images. For no value use an empty string:  ""
	var DO_NOT_CONTACT_OPTIONS = {
		"Yes": "linear-gradient(to bottom, #cdeb8e 0%,#a5c956 100%)",
		"No": ""
	};

/******************************************************************************************************************
	Modified Date Conditions
		The Comparison will be as follows. MOD_DATE_DIFF_VALUE {Condition} Actual_Difference. 
		
		For Example: if you wanted to add backgrounds to be added the Modified Date is more or is 1 day old not 
		including time, you would have the below values. 
			MOD_DATE_OPTIONS_BOOL = true, MOD_DATE_UNIT = "dnt", MOD_DATE_DIFF_VALUE = 1, and would fill out the 
			background options for "<" and "="

*******************************************************************************************************************/

	//Set this to be true or false if you would like to change the background images based on last Modified Date.
	var MOD_DATE_OPTIONS_BOOL = true;

	//This is the unit of measurement that you are comparing against todays date.
	//The allowed values are "s" for seconds, "m" for minutes, "h" for hours, "d" for days, and "dnt" for days with no time.
	//days with no time will only check different between days, and will ignore time entirely.
	var MOD_DATE_UNIT = "dnt";

	
	//The below value will be compared to the Modified Date
	//The related value must be positive, and remember it is in the above MOD_DATE_UNIT
	var MOD_DATE_DIFF_VALUE = 1;


	//For examples and more information see line 47 above
	var MOD_DATE_OPTIONS = {
		"<": "linear-gradient(to bottom, #ffff88 0%,#ffff88 100%)",
		">": "",
		"=": "linear-gradient(to bottom, #ffff88 0%,#ffff88 100%)"
	};

/******************************************************************************************************************
	Last Updated by Customer Condition
		Default Rainbow background - 
*******************************************************************************************************************/

	//set this to be true or false if you would like to change the background images based on Status.
	var LAST_UPDATE_BOOL = true;

	//Status options and their background images. For no value use an empty string:  ""

	var LAST_UPDATE_OPTIONS = {
		"Customer": "url('https://www.marcustuttle.com/Rainbow_smooth_small.gif')",
		"EtQ": ""
	};


/******************************************************************************************************************
	Current Support Views Configurations
		Make changes to these if columns are removed, added, or the order is changed.
*******************************************************************************************************************/

//Get the current view, and set the related columns.
switch( $(".CurrentViewItem").text() ) 
{
    case "All Tickets":
        
      var CurrentView = {
			Assigned:       1,
			Created_Date:   2,
			Status:         3,
			Customer:       4,
			hd_Number:      5, //prefix was added as Number is a reserved word in JS
			Subject:        6,
			Severity:       7,
			Product:        8,
			Version:        9,
			Support_Level:  10,
			Type:           11,
			Author:         12,
			Last_Editor:    13,
			Modified_Date:  14,
			Last_Update_By: 15,
			Do_not_contact: 16
		};
        break;

    case "Pending Tickets (TS Only)":

    	var CurrentView = {
	    	Assigned:			1,
			Status:				2,
			Customer:			3,
			hd_Number:			4,
			Subject:			5, //prefix was added as Number is a reserved word in JS
			Type:				6,
			Severity:			7,
			Product:			8,
			Version:			9,
			Modified_Date:		10,
			Last_Update_By:		11,
			Last_Update_By_2:	12, //there is two of these columns in the view. One is related to the rep.
			Do_not_contact:		13,
			Author:				14,
			Time_Zone:			15
		};

        break;


    case "Pending Tickets (TS Filtered)":

    	var CurrentView = {
	    	Assigned:			1,
			Status:				2,
			Customer:			3,
			hd_Number:			4,
			Subject:			5, //prefix was added as Number is a reserved word in JS
			Type:				6,
			Severity:			7,
			Product:			8,
			Version:			9,
			Modified_Date:		10,
			Last_Update_By:		11,
			Last_Update_By_2:	12, //there is two of these columns in the view. One is related to the rep.
			Do_not_contact:		13,
			Author:				14
		};

        break;
} 


/******************************************************************************************************************
 ******************************************************************************************************************
	End of Variables Block.
 ******************************************************************************************************************		
*******************************************************************************************************************/

//checks if on the login page and runs the customizations for the login page.
LoginPageChanges();

//if the current view is supported, continue forward
if(CurrentView)
{
	RC_main(CurrentView);
}


/**
 * The heart of RainbowCore, and the main function that does everything. 
 */
function RC_main(CurrentView)
{
	var elementRow = $("tr.ColumnValue").first(); //grabs the first element
	var amountOfTickets = $("table.TableColumnTitle tr.ColumnValue").length; //get the amount of tickets/elements in view
	var temp;
	var elementRowChild; //variable used as placeholder for child
	var elementRowChildInfo; //variable used as temp placeholder for information gathered from the Child

	//Loop through all of the related tickets
	for(i=0; i< amountOfTickets; i++)
	{
		//limit subject to 60 characters and add "..."
		
		if(SUBJECT_LIMIT > 0 && CurrentView.Subject)
		{

			elementRowChildInfo = elementRow.children(":first").nextAll().slice(CurrentView.Subject-1,CurrentView.Subject).text();

			elementRow.children(":first").nextAll().slice(CurrentView.Subject-1,CurrentView.Subject).html(elementRowChildInfo.substring(0,SUBJECT_LIMIT) + "...");
		}
		

		//Center status
		if(STATUS_CENTER && CurrentView.Status)
		{

			elementRow.children(":first").nextAll().slice(CurrentView.Status-1,CurrentView.Status).css("text-align", "center");
		}

		
		//Background changes.
		for (j = 0; j < CONDITION_PRIORTY.length; j++) 
		{

			
			switch(CONDITION_PRIORTY[j]) 
			{
			    case "Status":

				    //change the status background options
					if(STATUS_OPTIONS_BOOL && CurrentView.Status)
					{

						elementRowChildInfo = elementRow.children(":first").nextAll().slice(CurrentView.Status-1, CurrentView.Status).text();

						if (STATUS_OPTIONS[elementRowChildInfo])
						{
							elementRow.css("background", STATUS_OPTIONS[elementRowChildInfo]);
						}
						
					}
			        
			        break;
			    
			    case "Type":

			    	if(TYPE_OPTIONS_BOOL && CurrentView.Type)
			    	{

			    		elementRowChildInfo = elementRow.children(":first").nextAll().slice(CurrentView.Type-1, CurrentView.Type).text();

			    		if (TYPE_OPTIONS[elementRowChildInfo])
							{
								elementRow.css("background", TYPE_OPTIONS[elementRowChildInfo]);
							}

			    	}

			        break;

			    case "Do_not_contact":

			    	if(DO_NOT_CONTACT_BOOL && CurrentView.Do_not_contact)
			    	{

					    elementRowChildInfo = elementRow.children(":first").nextAll().slice(CurrentView.Do_not_contact-1,CurrentView.Do_not_contact).text();

						if(DO_NOT_CONTACT_OPTIONS[elementRowChildInfo])
						{
							elementRow.css("background", DO_NOT_CONTACT_OPTIONS[elementRowChildInfo]);
						}
					}

			    	break;

			    case "Modified_Date":

			    	if(MOD_DATE_OPTIONS_BOOL && CurrentView.Modified_Date)
			    	{			    		

			    		elementRowChildInfo = elementRow.children(":first").nextAll().slice(CurrentView.Modified_Date-1,CurrentView.Modified_Date).text();
			    		
			    		var currentDateTime = new Date();
			    		var hd_DateTime = new Date( elementRowChildInfo);//HD_DateConversion(elementRowChildInfo) );

						if( MOD_DATE_DIFF_VALUE < DateTimeDiff(currentDateTime, hd_DateTime, MOD_DATE_UNIT, true) )
						{ 
							if(MOD_DATE_OPTIONS["<"]) elementRow.css("background", MOD_DATE_OPTIONS["<"]);
						
							
						}
						else if( MOD_DATE_DIFF_VALUE > DateTimeDiff(currentDateTime, hd_DateTime, MOD_DATE_UNIT, true) )
						{
							if(MOD_DATE_OPTIONS[">"]) elementRow.css("background", MOD_DATE_OPTIONS[">"]);
							
						}
						else if( MOD_DATE_DIFF_VALUE == DateTimeDiff(currentDateTime, hd_DateTime, MOD_DATE_UNIT, true) )
						{
							if(MOD_DATE_OPTIONS["="]) elementRow.css("background", MOD_DATE_OPTIONS["="]);
							
												
						}							


						

			    	}
			        
			        break;

			    case "Last_Update_By":

			    	if(LAST_UPDATE_BOOL && CurrentView.Last_Update_By)
			    	{
					    elementRowChildInfo = elementRow.children(":first").nextAll().slice(CurrentView.Last_Update_By-1,CurrentView.Last_Update_By).text();

						if(LAST_UPDATE_OPTIONS[elementRowChildInfo])
						{
							elementRow.addClass("CustomerOpen");
							elementRow.css("background", LAST_UPDATE_OPTIONS[elementRowChildInfo]);
						}
					}

			    	break;
			}
			

		}
		
		
		//Center date and remove seconds
		if(DATE_SEC_REMOVE && CurrentView.Modified_Date)
		{

			//if created date exists
			if(CurrentView.Created_Date)
			{
				elementRowChildInfo = elementRow.children(":first").nextAll().slice(CurrentView.Created_Date-1,CurrentView.Created_Date).text();
				elementRowChildInfo = elementRowChildInfo.substring(0, elementRowChildInfo.length - 6) + elementRowChildInfo.substring(elementRowChildInfo.length - 3,elementRowChildInfo.length);
				elementRow.children(":first").nextAll().slice(CurrentView.Created_Date-1,CurrentView.Created_Date).html(elementRowChildInfo);
				elementRow.children(":first").nextAll().slice(CurrentView.Created_Date-1,CurrentView.Created_Date).css("text-align", "center");

			}

			elementRowChildInfo = elementRow.children(":first").nextAll().slice(CurrentView.Modified_Date-1,CurrentView.Modified_Date).text();
			elementRowChildInfo = elementRowChildInfo.substring(0, elementRowChildInfo.length - 6) + elementRowChildInfo.substring(elementRowChildInfo.length - 3,elementRowChildInfo.length);
			elementRow.children(":first").nextAll().slice(CurrentView.Modified_Date-1,CurrentView.Modified_Date).html(elementRowChildInfo);			
			elementRow.children(":first").nextAll().slice(CurrentView.Modified_Date-1,CurrentView.Modified_Date).css("text-align", "center");

		}

		

		
		//Bold Ticket Numbers
		if(BOLD_TICKET_NUM && CurrentView.hd_Number)
		{

			//bold ticket numbers
			elementRowChildInfo = elementRow.children(":first").nextAll().slice(CurrentView.hd_Number-1, CurrentView.hd_Number);
			elementRowChildInfo.css("font-weight", "bold");
		}
		
		
		
		//go to the next row
		elementRow = elementRow.next();
	}


}


/**
 * Returns the difference in Days not including time, Days, Hours, Minutes, or Seconds 
 *	from date objects Date1 and Date2.
 * @param {Date} Date1
 * @param {Date} Date2
 * @param {String} diffType - this can be "dnt", d", "h", "m", or "s".
 * @param {Boolean} round_Return - true or false if the final value should return rounded
 * @return {Number}
 */
function DateTimeDiff(Date1, Date2, diffType, round_Return) 
{
  var returnValue = -1;

  if(Date1 && Date2){
    
    switch(diffType){
        
        case "s": //Seconds
          returnValue = Math.abs(Date1.getTime() - Date2.getTime())/1000;
          break;

        case "m": //Minutes
          returnValue = Math.abs(Date1.getTime() - Date2.getTime())/60000;
          break;

        case "h": //Hours
          returnValue = Math.abs(Date1.getTime() - Date2.getTime())/60000 /60;
          break;

        case "d": //Days
          returnValue = Math.abs(Date1.getTime() - Date2.getTime())/60000 /60 /24;
          break;

        case "dnt": //Days
        	var Date1_nt = new Date (Date1.toDateString());
        	var Date2_nt = new Date (Date2.toDateString());
          returnValue = Math.abs(Date1_nt.getTime() - Date2_nt.getTime())/60000 /60 /24;
        break;
      }
      
    if(round_Return)
      {
        returnValue = Math.round(returnValue);
      }
   } 
  return returnValue;
}

/**
 * Checks if the related page is on the login page, if so, it does the needed logo
 * replacements and css changes. 
 */
function LoginPageChanges()
{
	if($( "body" ).hasClass( "LoginPage" ))
	{
		//checks if the password is asking to be changed, and skips if so
		if($("#ChangePasswordOkId").length > 0)
			{
				$("body").addClass("show_login");
				return;
			}
		$('img[alt="Reliance Logo"]').attr("src", "http://www.marcustuttle.com/RainbowCore_Animated.gif");
		$('img[alt="Reliance Logo"]').attr("width", "625px");
		$('img[alt="Reliance Logo"]').attr("height", "200px");
		
		$('div.LicensedSoftwareDiv').html('<a href="http://www.etq.com/privacy-policy.shtml" style="float: right;padding-right: 24px;">Privacy Policy </a> <a href="#" id="ChangePassword" class="float-left" onclick="changePassword();return false;"style="padding-left: 17px;">Change Password</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
		
		$("body").addClass("show_login");
		
		

	GM_addStyle (`
	/* front page start*/
		@import url(https://fonts.googleapis.com/css?family=Open+Sans);
		input { 
			width: 100% !important;
			margin-bottom: 10px; !important 
			background: rgba(0,0,0,0.3) !important;
			border: none !important;
			outline: none !important;
			padding: 10px !important;
			font-size: 13px !important;
			color: #fff !important;
			text-shadow: 1px 1px 1px rgba(0,0,0,0.3) !important;
			border: 1px solid rgba(0,0,0,0.3) !important;
			border-radius: 4px !important;
			box-shadow: inset 0 -5px 45px rgba(100,100,100,0.2), 0 1px 1px rgba(255,255,255,0.2) !important;
			-webkit-transition: box-shadow .5s ease !important;
			-moz-transition: box-shadow .5s ease !important;
			-o-transition: box-shadow .5s ease !important;
			-ms-transition: box-shadow .5s ease !important;
			transition: box-shadow .5s ease !important;
		}
		input:focus { box-shadow: inset 0 -5px 45px rgba(100,100,100,0.4), 0 1px 1px rgba(255,255,255,0.2); }


		.btn{
			background:none !important;
			font-size:15px;
			border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25); 
			-webkit-border-radius: 4px; 
			-moz-border-radius: 4px; 
			border-radius: 4px;
			-webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05); 
			-moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05); 
			box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
		}
		.btn-blue{border:none;}


		.login-form{background: none !important;}
		.input-Field-Separator{display:none !important;}
		.input-group > input[name="ETQ$LOGIN_USERNAME"]{ background:none !important;}
		.input-group > input[name="ETQ$LOGIN_USERNAME"]:focus{ background:none !important;}
		.input-group > input[name="ETQ$LOGIN_PASSWORD"]{ background:none !important;}
		.input-group > input[name="ETQ$LOGIN_PASSWORD"]:focus{ background:none !important; border-color:white !important;}
		
    .Loginlinks{
       background-color:#040204 !important;
       border-top:none;
       display:none;
       
    }
		.wrapper{
			 display: table-cell;
			 text-align: center;
			 vertical-align: middle;	
		}
		.Reliance-logo{display:none;}
		.company-logo{margin-top: -100px !important;}
     a:link,a:hover{color:white !important;}
		
	`);
  }
}

