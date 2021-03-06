---
title: Use Custom JsonResult with Ajax-Bound Grids
page_title: Use Custom JsonResult with Ajax-Bound Grids | Kendo UI Grid HtmlHelper
description: "Create a custom JSON result to change the default JSON serializer."
slug: howto_usecustomjsonresultajaxbound_gridaspnetmvc
---

# Use Custom JsonResult with Ajax-Bound Grids

The example below demonstrates how to use a custom JSON serializer for the controller and for the server-bound data of the widget. For the controller, this is achieved by overriding the `Json` method. For the widgets, this is achieved through the registration (with the DI) of a custom `IJavaScriptInitializer` implementation on the application `start` event.

To see the example on how to use a custom `JsonResult` with an Ajax-bound Grid, refer to [this project](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/ajax-bound-grid-custom-json-result).

## See Also

Other articles and how-to examples on the Kendo UI Grid HtmlHelper:

* [Overview of the Grid HtmlHelper]({% slug overview_uploadhelper_aspnetmvc %})
* [How to Apply Custom Row Styles Based on Model Data]({% slug howto_applycustomrrowstylesmodeldata_gridaspnetmv %})
* [How to Bind the Grid to DataTable]({% slug howto_bindgridtodatatable_gridaspnetmvc %})
* [How to Handle Unauthorized Requests with Ajax-Bound Grids]({% slug howto_handleunathorizedrequestsajaxbound_gridaspnetmv %})
* [How to Post Grid Data with Form]({% slug howto_postgriddatawithform_gridaspnetmv %})
* [How to Post Grid Selection to Server]({% slug howto_postselectiontoserver_gridaspnetmv %})
* [How to Use Grid Hierarchy with Dynamic Model Loading and DataTable]({% slug howto_usegridhierarchydynamicmodelload_gridaspnetmv %})
* [How to Use Grid Self-Referencing Hierarchy]({% slug howto_usegridselfrefhierarchy_gridaspnetmv %})
* [How to Use oData v4 with WebAPI Controller]({% slug howto_useodata4webapicontroller_gridaspnetmvc %})
* [How to Use the Sortable to Reorder Grid Rows]({% slug howto_usesortabletoreorder_gridaspnetmv %})
* [How to Use UTC on Both Client and Server]({% slug howto_useutctimeonclientandserver_gridaspnetmv %})

For more runnable examples on the Kendo UI Grid in ASP.NET MVC applications, browse its [**How To** documentation folder]({% slug howto_applycustomrowstylesbasedondata_gridaspnetmvc %}).
