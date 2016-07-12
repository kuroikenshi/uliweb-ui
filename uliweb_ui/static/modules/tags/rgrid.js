riot.tag2('rgrid', '<query-condition if="{has_query}" rules="{query_ules}" fields="{query_fields}" layout="{query_layout}"></query-condition> <rtable cols="{cols}" options="{rtable_options}" data="{data}" start="{start}"></rtable> <div class="clearfix tools"> <pagination if="{pagination}" data="{data}" url="{url}" page="{page}" total="{total}" limit="{limit}" onpagechanged="{onpagechanged}"></pagination> <div if="{!pagination}" id="pagination" class="pull-left"></div> </div>', '', '', function(opts) {


  self = this

  this.data = new DataSet()
  this.cols = opts.cols
  this.url = opts.url
  this.page = opts.page || 1
  this.limit = opts.limit || 10
  this.total = opts.total || 0
  this.pagination = opts.pagination == undefined ? true : opts.pagination
  this.has_query = opts.query !== undefined
  this.query = opts.query || {}
  this.query_rules = this.query.rules || {}
  this.query_fields = this.query.fields || []
  this.query_layout = this.query.layout || []
  this.start = (this.page - 1) * this.limit

  this.rtable_options = {
    tableClass : opts.tableClass || 'table table-bordered',
    nameField : opts.nameField || 'name',
    labelField : opts.labelField || 'title',
    onUpdate: opts.onupdate || function(data){
      $('#pagination').text('共 ' + data.length + ' 条记录')
    }
  }

  this.onpagechanged = function (page) {
    self.start = (page - 1) * self.limit
    self.update()
  }

  this.on('mount', function(){
    this.load()
  })

  this.load = function(url){
    self.url = url || self.url
    self.data.load(self.url, function(r){
      self.total = r.total
      return r.rows
    }).done(function(){
      self.update()
    })
  }
});
