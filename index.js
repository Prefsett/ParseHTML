class ParseHTML {
  constructor(code = '', tag = '') {

    this.tag = tag.toLowerCase( );
    
    const debug = () => {
      const tagNames = [
    'html',  'base',  'head',  'link',  'meta',  'style',  'title',  'body',  'address',  'article',  'aside',  'footer',  'header',  'h1',  'h2',  'h3',  'h4',  'h5',  'h6',  'main',  'nav',  'section',  'blockquote',  'dd',  'div',  'dl',  'dt',  'figcaption',  'figure',  'hr',  'li',  'menu',  'ol',  'p',  'pre',  'ul',  'a',  'abbr',  'b',  'bdi',  'bdo',  'br',  'cite',  'code',  'data',  'dfn',  'em',  'i',  'kbd',  'mark',  'q',  'rp',  'rt',  'ruby',  's',  'samp',  'small',  'span',  'strong',  'sub',  'sup',  'time',  'u',  'var',  'wbr',  'area',  'audio',  'img',  'map',  'track',  'video',  'embed',  'iframe',  'object',  'picture',  'portal',  'source',  'svg',  'math',  'canvas',  'noscript', 'script', 'del', 'ins',  'caption',  'col',  'colgroup',  'table',  'tbody',  'td',  'tfoot',  'th',  'thead',  'tr',  'button',  'datalist',  'fieldset',  'form',  'input',  'label',  'legend',  'meter',  'optgroup',  'option',  'output',  'progress',  'select',  'textarea',  'details',  'dialog',  'summary',  'slot',  'template'
      ];

      let errs = {
        contentCheck: {
          key: !(code && tag),
          value: 'Please enter all required content to complete the functions!'
        },
        validTagName: {
          key: !tagNames.includes( tag ),
          value: 'Please enter a valid tag name!'
        }
      };

      const checkList = [errs.contentCheck, errs.validTagName];

      for (let err of checkList) {
        if (err.key) {
          return {
            key: true,
            value: err.value
          };
        }
      }
      
      return {
        key: false,
        value: 'No errors!!!'
      };
    }
    
    this.memory = {
      regExp: {
        repeat: new RegExp (
          "<" + tag + ".*?>" 
        + "(.*?)" 
        + "<\/" + tag + ">"
        , "ig"
        ),
        content: new RegExp (
          "<(.*?)>|"
        + "<\/(.*?)>"
        , "ig"
        ),
        attributeRef: new RegExp (
          "(class|id)"
        + "+=+"
        + "(\"(.*?)\"|\'(.*?)\')"
        , "ig"
        ),
        attribute: new RegExp(
          "<" + tag + ">"
        + "(.*?)"
        + "<\/" + tag + ">"
        , "ig"
        )
      },
      fn: {
        clear: arr => {
          let result = [];
          for (let item of arr) {
            if (item) {
              result.push(item);
            }
          }
          return result;
        }
      },
      debug: {
        ...debug()
      },
      result: {
        //cache
      }
    }
    
    const { regExp } = this.memory;

    this.repeats = [];
    this.contents = [];
    this.attributesRef = [];
    this.attributes = [];
    
    this.repeats = code.match(regExp.repeat) || [];
    
    this.contents = this.repeats.map( el => {
        return el.replace(regExp.content, '');
    });
    
    this.repeats.forEach( el => {
      this.attributesRef.push(
        el.match( regExp.attributeRef )
      )
    });
    this.repeats.forEach( el => {
      this.attributes.push(
        el.replace(regExp.attribute, '')
      )
    });

    const { clear } = this.memory.fn;
    this.attributesRef = clear(this.attributesRef);
    this.contents = clear(this.contents);
    this.attributes = clear(this.attributes);

    delete this.memory.regExp;
    delete this.memory.fn;
  }

  #get( setReturn ) {
    const { debug, result } = this.memory;

    if (debug.key) {
      return debug.value;
    }
    
    if (result[setReturn]) {
      return result[setReturn];
    }

    result[setReturn] = setReturn.length ? setReturn : 'Not found...';
    
    return result[setReturn];
  }

  getRepeats() {
    return this.#get( this.repeats );
  }
  
  getContents() {
    return this.#get( this.contents );
  }
  
  getAttributesRef() {
    return this.#get( this.attributesRef );
  }

  getAttributes() {
    return this.#get( this.attributes );
  }
}
