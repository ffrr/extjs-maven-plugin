/**
 * Renderers
 * A collection of general-purpose renderers.
 * 
 * @author fk
 * @version 0.1
 * @date Jun 3, 2011
 */

DanteFrontend.view.Renderers = {
    
    progressBar: function(min, max, current, gcolor, bcolor) {
	var one   = 100 / (max - min);
	var wpbar = Math.floor(one * current); // width of progress bar

	// if wpbar is more than 100%, cap it to 100
	if (wpbar > 100) wpbar = 100;
	// if there is some current progress, but progress bar displays nothing, show some progress
	if (current > 0 && wpbar == 0) wpbar = 1;

	var wbbar = 100 - wpbar; // width of background bar

	var pbar = '';
	// show progress part only if some progress
	if (wpbar > 0) {
		pbar += '<div style="float: left; background-color: ' + gcolor + '; width: ' + wpbar + '%">&nbsp;</div>';
	}
	// show background part only if some background
	if (wbbar > 0) {
		pbar  += '<div style="float: left; background-color: ' + bcolor + '; width: ' + wbbar + '%">&nbsp;</div>';
	}
        
	return (pbar);
    },

    duration: function(val) {
        var minutes = Math.ceil(val % 60);
        var hours   = Math.floor(val / 60);
        return (Ext.String.format('{0}:{1} hrs', hours, ('00' + minutes).slice(-2)));
    },

    date: function(val) {
      return Ext.Date.format(val, DanteFrontend.common.defaultDateFormat);;
    },
    
    worklog: {
        hiddenRow: function(record) {
            return record.json.hidden ? 'worklog-tasklist-row-hiddentask':'';
        },

        descriptionTooltip: function(value,metadata, record){
            if(record.data.hidden) value += " <strong>(hidden task)</strong>"
            metadata.tdAttr = 'data-qtip="' + value + '"';
            return value;
        },

        taskSummary: function(v, params, data){
            return ((v === 0 || v > 1) ? '(' + v +' tasks)' : '(1 task)');
        }
    },
    dashboard: {
        projectName: function(val, md, rec) {
            //console.log('<a href="' + res('url.project') + rec.id + '">' + val + '</a>');
            return ('<a href="' + res('url.project') + rec.internalId + '">' + val + '</a>');
        },
        plannedTimeRemaining: function(val, md, rec) {
          var time_planned   = rec.data['timePlanned'];
          var time_remaining = time_planned - rec.data['timeSpent'];
          var time_spent     = time_planned - time_remaining;
          if (time_spent > time_planned * 0.75) {
            gauge_color = 'red';
          } else {
            gauge_color = 'green';
          }

          return (DanteFrontend.view.Renderers.progressBar(0, time_planned, time_spent, gauge_color, '#eee'));
        },
        timeRemaining: function(val, md, rec) {
          var time_planned   = rec.data['timePlanned'];
          var time_remaining = time_planned - rec.data['timeSpent'];

          var is_overdue = false;
          if (time_remaining < 0) {
            time_remaining *= -1;
            is_overdue = true;
          }

          if (is_overdue) {
            md.style = 'color: red; font-weight: bold';
          }

          var minutes = Math.floor(time_remaining % 60);
          var hours   = Math.floor(time_remaining / 60);
          return ((is_overdue ? '+ ' : '') + Ext.String.format('{0}:{1} hrs', hours, ('00' + minutes).slice(-2)));
        }
    },

    tool: function(text) {
         return ['<div class="msedit-back"><div class="{baseCls}-{type}">' +
                '<img src="{blank}" role="presentation"/><span>' +
                '<span>' + text + '</span></div></div>'];
    },

    userNameRenderer: function(v, md, rec) {
        // lookup store, return name
        return 'Ferko Karika';
    },

    sum: function(v) {
        return v + ' &#8364;';
    },


    budget: {
        reason: function(val, md, r) {
            return Ext.data.StoreManager.lookup('budget.ConfirmationReasons').getById(r.get('confirmationReason_id')).get('name');
        },

        status: function(val, md, r) {
            return Ext.data.StoreManager.lookup('budget.ConfirmationStatuses').getById(r.get('confirmationStatus_id')).get('name');
        },
        

        direction: function(v, md, r) {
            var dir = r.get('direction_id');
            md.tdCls = "direction-" + dir;
        },

        directionSum: function(v, md, r) {
            v = v + ' &#8364;';
            var dir = r.get('direction_id');
            if(dir) return '- ' + v;
            return v;
        }        
    }
};