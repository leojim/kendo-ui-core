(function() {
    var container,
        asyncDataSource,
        virtualSettings,
        VirtualList = kendo.ui.VirtualList,
        ITEM_HEIGHT = 40,
        CONTAINER_HEIGHT = 200;

    function scroll(element, height) {
        element.scrollTop(height);
        element.trigger("scroll");
    }

    function generateData(parameters) {
        var items = [];
        for (var i = parameters.skip, len = parameters.skip + parameters.take; i < len; i++) {
            items.push({
                text: " Item " + i
            });
        }

        return items;
    }

    var Async = kendo.Class.extend({
        init: function() {
            this.promises = [];
        },

        exec: function(callback) {
            var promise = $.Deferred();

            promise.done(callback);

            this.promises.push(promise);
        },

        resolve: function(idx) {
            var promise = this.promises[idx];

            if (!promise) {
                throw new Error("There is no promise to resolve!");
            }

            promise.resolve();
        },

        allDone: function(callback) {
            $.when.apply(null, this.promises).done(callback);
        }
    });

    module("VirtualList without valueMapper: ", {
        setup: function() {
            container = $("<div id='container'></div>").appendTo(QUnit.fixture);

            asyncDataSource = new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success({ data: generateData(options.data), total: 100 });
                        }, 0);
                    }
                },
                serverPaging: true,
                pageSize: 40,
                schema: {
                    data: "data",
                    total: "total"
                }
            });

            virtualSettings = {
                autoBind: false,
                dataSource: asyncDataSource,
                itemHeight: ITEM_HEIGHT,
                height: CONTAINER_HEIGHT,
                template: "#:text#"
            };
        },

        teardown: function() {
            if (container.data("kendoVirtualList")) {
                container.data("kendoVirtualList").destroy();
            }

            QUnit.fixture.empty();
        }
    });

    function createAsyncDataSource(options) {
        return new kendo.data.DataSource($.extend({
            transport: {
                read: function(options) {
                    setTimeout(function() {
                        options.success({ data: generateData(options.data), total: 100 });
                    }, 0);
                }
            },
            serverPaging: true,
            pageSize: 40,
            schema: {
                data: "data",
                total: "total"
            }
        }, options));
    }

    asyncTest("value is set", 1, function() {
        $.extend(virtualSettings, {
            valueMapper: function(o) {
                o.success({
                    value: o.value,
                    text: "Item " + o.value
                });
            },
            mapValueTo: "dataItem"
        });

        var virtualList = new VirtualList(container, virtualSettings);
        asyncDataSource.read().done(function() {
            virtualList.value(37).done(function() {
                start();
                equal(virtualList.value(), 37);
            });
        });
    });

    asyncTest("selectedDataItems are set", 2, function() {
        $.extend(virtualSettings, {
            valueMapper: function(o) {
                o.success({
                    value: o.value,
                    text: "Item " + o.value
                });
            },
            mapValueTo: "dataItem"
        });

        var virtualList = new VirtualList(container, virtualSettings);
        asyncDataSource.read().done(function() {
            virtualList.value(37).done(function() {
                start();
                ok(virtualList.selectedDataItems().length);
                equal(virtualList.selectedDataItems()[0].value, 37);
            });
        });
    });

    asyncTest("selectedIndexes are undefined", 2, function() {
        $.extend(virtualSettings, {
            valueMapper: function(o) {
                o.success({
                    value: o.value,
                    text: "Item " + o.value
                });
            },
            mapValueTo: "dataItem"
        });

        var virtualList = new VirtualList(container, virtualSettings);
        asyncDataSource.read().done(function() {
            virtualList.value(37).done(function() {
                start();
                equal(virtualList.select().length, 1);
                equal(virtualList.select()[0], undefined);
            });
        });
    });
/*
    asyncTest("deselects and already resolved dataItem (multiple selection)", 4, function() {
        $.extend(virtualSettings, {
            valueMapper: function(o) {
                o.success({
                    value: o.value,
                    text: "Item " + o.value
                });
            },
            mapValueTo: "dataItem",
            selectable: "multiple",
        });

        var virtualList = new VirtualList(container, virtualSettings);
        asyncDataSource.read().done(function() {
            virtualList.value([37, 60]).done(function() {
                virtualList.bind("change", function() {
                    start();
                    equal(this.selectedDataItems().length, 1);
                    equal(this.selectedDataItems()[0].value, 37);
                    equal(this.select().length, 1);
                    equal(this.select()[0], undefined);
                });
                virtualList.select(60);
            });
        });
    });

    asyncTest("reports correct removed items (multiple selection)", 6, function() {
        $.extend(virtualSettings, {
            valueMapper: function(o) {
                o.success({
                    value: o.value,
                    text: "Item " + o.value
                });
            },
            mapValueTo: "dataItem",
            selectable: "multiple"
        });

        var virtualList = new VirtualList(container, virtualSettings);
        asyncDataSource.read().done(function() {
            virtualList.value([37, 60]).done(function() {
                virtualList.open();
                virtualList.bind("change", function() {
                start();
                equal(this.selectedDataItems().length, 3);
                equal(this.selectedDataItems()[2].value, 3);
                equal(this.select().length, 3);
                equal(this.select()[0], undefined);
                equal(this.select()[1], undefined);
                equal(this.select()[2], undefined);
                })
                virtualList.select(3);
            });
        });
    });
*/
})();