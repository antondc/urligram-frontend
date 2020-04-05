import { matchPath } from 'react-router-dom';

// Returns the text from HTML string
// @param {html} string
// @returns String
// https://stackoverflow.com/questions/822452/strip-html-from-text-javascript
// HTML Entity Decode https://stackoverflow.com/questions/5796718/html-entity-decode
// &amp;amp; malformed in XML https://stackoverflow.com/questions/18019716/is-ampamp-valid/25273781
// Remove spaces from string to check differences
export const getTextFromHtml = html => {
  html = html.replace('&amp;amp;', '&');

  var element = document.createElement('div');
  html = html.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, '');
  html = html.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, '');
  element.innerHTML = html;
  html = element.textContent;
  element.textContent = '';

  html = html.replace(/ /g, '');

  return html;
};

// Create a new random UUIID
// @returns INT with UUIID
export const randomUid = function() {
  let uid = Math.random() * 10000;

  return parseInt(uid, 10);
};

// Logs React state to browser console
// @param {content} object
// @returns Object
export const logState = function(content) {
  console.log(JSON.parse(JSON.stringify(content)));
};

// Transform given url into relative
// @param {content} string
// @returns string
export const toRelative = function(url) {
  return url.charAt(0) === '/' ? url.slice(1) : url;
};

// Transform given url into absolute
// @param {url} string
// @returns string
export const toAbsolute = function(url) {
  return url && url[0] !== '/' ? '/' + url : url;
};

// Logs FormData to browser console
// @param {formdata} Object
// @returns Object
export const logFormData = formdata => {
  // Display the key/value pairs
  for (var pair of formdata.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
  }
};

// Given an object check it there are keys with 'original' or 'remove'; first case return value, second case iterate and return each value
// @param {object} Object
// @returns Object
export const checkIfFileUrls = object => {
  var results = [];
  var repeat = object => {
    for (var key in object) {
      if (key === 'original') {
        results.push(object[key]);
      } else if (key === 'remove') {
        object[key].forEach(item => {
          results.push(item);
        });
      }
      if (object[key] instanceof Object) {
        repeat(object[key]);
      }
    }

    return results;
  };
  repeat(object);

  return results;
};

// For final-form-arrays: move fields
// @param {e} Object Event of the method called
// @param {form} Object
// @param {fields} Object
// @returns Object
export const moveFields = ({ oldIndex, newIndex }, form, fields) => {
  let order = 0;
  fields.move(oldIndex, newIndex);
  form.getFieldState(fields.name).value.forEach(item => {
    item.order = order++;
  });
};

// For final-form-arrays: get array of language slugs and return an object with keys and language props
// @param {languages} Array of objects
// @returns Object
export const setTranslations = languages => {
  const translations = {};
  languages.map(item => {
    translations[item.slug] = {
      language: item.slug,
    };
  });

  return translations;
};

// For final-form-arrays: get fields and return the last order plus one
// @param {fields} Object
// @param {field} String
// @returns int
export const getMaxIdFromField = (fields, field) => {
  if (!fields.value) {
    return 0;
  }
  var maxField = Math.max.apply(
    Math,
    fields.value.map(function(item) {
      return item[field] + 1;
    })
  );

  return maxField;
};

// For final-form-arrays: push a new item to the array with new order number and { new: true }
// @param {fields} Object
// @returns Object
export const pushNewItem = (fields, lang) => {
  var newOrder = Math.max.apply(
    Math,
    fields.value.map(function(item) {
      return item.order + 1;
    })
  );

  return fields.push({
    order: newOrder,
    new: true,
    language: lang,
  });
};

// Receive an array of objects and a model; returns a new array with all promises
// @param {array} Array
// @param {model} Object
// @returns Array
export const upsertToArray = (data, model, chainedPromises = []) => {
  if (data instanceof Array) {
    data.forEach(element => {
      if (element.hasOwnProperty('remove')) {
        chainedPromises.push(
          model.destroy({
            where: {
              id: element.id,
            },
          })
        );
      } else {
        chainedPromises.push(
          model.upsert(element, {
            where: {
              id: element.id,
            },
          })
        );
      }
    });
  } else {
    if (data.hasOwnProperty('remove')) {
      chainedPromises.push(
        model.destroy({
          where: {
            id: element.id,
          },
        })
      );
    } else {
      chainedPromises.push(
        model.upsert(data, {
          where: {
            id: data.id,
          },
        })
      );
    }
  }

  return chainedPromises;
};

// Get a data CUSTOM_IMAGE type from a Sequelize model, check its sizes properties, and rebuild the url with them.
// @param {array} Array
// @param {separator} String
// @returns Array
export const arrayLastItem = function(array, separator) {
  return array.split(separator)[array.split(separator).length - 1];
};

// Remove extension of file name
// @param {fileName} String
// @returns String
export const removeExtension = function(fileName) {
  return fileName.replace(/\.[^/.]+$/, '');
};

// Get extension of file name
// @param {fileName} String
// @returns String
export const getExtension = function(fileName) {
  return fileName.split('.').pop();
};

// Camelcase to Underscore
// @param {string} String
// @returns String
export const deCamelize = function(string) {
  return string.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
};

// Camelize a string, cutting the string by multiple separators like hyphens, underscores and spaces.
// @param {text} String Text to camelize
// @return string Camelized text
export const camelize = function(text) {
  return text.replace(/^([A-Z])|[\s-_]+(\w)/g, function(match, p1, p2, offset) {
    if (p2) return p2.toUpperCase();

    return p1.toLowerCase();
  });
};

// Check an object with routes and return the one which path prop matches passed url.
// @param {url} String Current url
// @param {Routes} object Object with routes
// @return object of active route
export const findActiveRoute = function(url, Routes) {
  return (
    Object.values(Routes).find(route => {
      return matchPath(url, route);
    }) || {}
  );
};

export const addLanguagesToPaths = function(routes, joinedSlugs) {
  let routesWithPaths = Object.assign({}, routes);

  for (const route in routesWithPaths) {
    routesWithPaths[route].path = routesWithPaths[route].path.replace(':lang?', ':lang(' + joinedSlugs + ')?');
  }

  return routesWithPaths;
};

// Get a JSON structure, Array or object, look for objects with «Language» prop, and transform them into objects with the language prop as a key. Useful for multilingual data.
// @param {data} object Data to transform
// @return object of translated content

export const normalizeTranslatedData = function(data) {
  var clonedData = JSON.parse(JSON.stringify(data));
  const transform = function(data) {
    for (var prop in data) {
      if (data[prop].length > 0 && data[prop] instanceof Array && data[prop][0].hasOwnProperty('language')) {
        var transformedData = data[prop].reduce(function(prev, current, index) {
          prev[current.language] = current;

          return prev;
        }, {});
        data[prop] = transformedData;
      } else if (data[prop] instanceof Object && !(data[prop] instanceof Array)) {
        transform(data[prop]);
      } else if (data[prop] instanceof Array) {
        data[prop].forEach(item => {
          transform(item);
        });
      }
    }

    return data;
  };
  if (clonedData instanceof Array) {
    var newData = [];
    clonedData.map(item => {
      newData.push(transform(item));
    });
  } else if (clonedData instanceof Object && !(clonedData instanceof Array)) {
    var newData = {};

    newData = transform(clonedData);
  }

  return newData;
};

// Get a JSON structure, Array or object, look for objects with «Language» prop, and transform them into objects with the language prop as a key. Useful for multilingual data.
// @param {data} object Data to transform
// @return object of translated content

export const denormalizeTranslatedData = function(data) {
  const transform = function(data) {
    for (var prop in data) {
      if (
        data[prop] instanceof Object &&
        data[prop][Object.keys(data[prop])[0]] instanceof Object &&
        data[prop][Object.keys(data[prop])[0]].hasOwnProperty('language')
      ) {
        let newData = [];
        for (const key in data[prop]) {
          newData.push(data[prop][key]);
        }
        data[prop] = newData;
      } else if (data[prop] instanceof Object && !(data[prop] instanceof Array)) {
        transform(data[prop]);
      } else if (data[prop] instanceof Array) {
        data[prop].forEach(item => {
          transform(item);
        });
      }
    }

    return data;
  };

  let newData = transform(data);

  return newData;
};

// Sorter for Redux
const sortBy = (type, field) => {
  switch (type) {
    case 'date':
      return (a, b) => {
        return new Date(b[field]) - new Date(a[field]);
      };
    case 'string':
      return (a, b) => {
        return a[field] < b[field] ? -1 : 1;
      };
    default:
      return (a, b) => {
        return b[field] - a[field];
      };
  }
};

// Sorter for Redux
export const sortFunction = sort => {
  return sort === 'SORTED_BY_TITLE'
    ? sortBy('string', 'title')
    : sort === 'SORTED_BY_RATING'
    ? sortBy('number', 'rating')
    : sortBy('date', 'timestamp');
};

export const getSelectionRange = () => {
  const selection = window.getSelection();
  if (selection.rangeCount === 0) return null;

  return selection.getRangeAt(0);
};

export const getSelectionCoords = (selectionRange, id) => {
  const editorBounds = document.getElementById(id).getBoundingClientRect();
  const rangeBounds = selectionRange.getBoundingClientRect();
  const rangeWidth = rangeBounds.right - rangeBounds.left;
  const offsetLeft =
    rangeBounds.left -
    editorBounds.left +
    rangeWidth / 2 -
    /* 107px is width of inline toolbar */
    142 / 2;
  // 42px is height of inline toolbar (35px) + 5px center triangle and 2px for spacing
  const offsetTop = rangeBounds.top - editorBounds.top - 42;

  return { offsetLeft, offsetTop };
};

// Traverse an object iterating recursively and returns the values of 'img'
// @param {object} Object
// @param {fn} Function
// @returns void
// traverseObject(valueJSON, function(key, value) {
//     console.log(key, ': ', value);
// });
export const traverseObject = function(object) {
  const traverse = function(object) {
    for (const key in object) {
      if (object[key] instanceof Array) {
        if (key === 'slides') {
          object[key].forEach(function(item) {
            if (item.tempImg) {
              imagesList.push(item);
            }
          });
        } else {
          object[key].forEach(function(item) {
            traverse(item);
          });
        }
      } else if (object[key] instanceof Object) {
        if (key === 'img' && object[key].tempImg) {
          imagesList.push(object[key]);
        } else {
          traverse(object[key]);
        }
      }
    }
  };
  traverse(object);
};

// Traverse an object iterating recursively and returns the values of 'img'
// @param {object} Object
// @param {fn} Function
// @returns void
// traverseObject(valueJSON, function(key, value) {
//     console.log(key, ': ', value);
// });
export const extractImages = function(object) {
  var imagesList = [];
  const traverse = function(object) {
    for (const key in object) {
      if (object[key] instanceof Array) {
        if (key === 'slides') {
          object[key].forEach(function(item) {
            if (item.tempImg) {
              imagesList.push(item);
            }
          });
        } else {
          object[key].forEach(function(item) {
            traverse(item);
          });
        }
      } else if (object[key] instanceof Object) {
        if (key === 'img' && object[key].tempImg) {
          imagesList.push(object[key]);
        } else {
          traverse(object[key]);
        }
      }
    }
  };
  traverse(object);

  return imagesList;
};

/* DEPRECATED */
// Creating a FormData() with separate files and data for Multer.
// Receive an array of objects and a model; returns a new array with all promises
// @param {array} Array
// @param {model} Object
// @returns Array
// export const createFormData = (object, formData = new FormData()) => {
//     formData.append('data', JSON.stringify(object));
//     var repeat = (object, formData) => {
//         for (var key in object) {
//             if (object[key] instanceof File || object[key] instanceof Blob) {
//                 formData.append(key, object[key]);
//             }
//             if (object[key] instanceof Array) {
//                 object[key].map((item) => {
//                     repeat(item, formData);
//                 });
//             } else if (object[key] instanceof Object) {
//                 repeat(object[key], formData);
//             }
//         }

//         return formData;
//     };

//     repeat(object, formData);

//     return formData;
// };

/* DEPRECATED */
// @param {text} string
// @return string
// Get a model name from an attribute of this model; only when the first word of the attribute is the name of the model separated by underscore
// export const getModelName = (string) => {
//     string = string.split('_')[0];

//     return string.charAt(0).toUpperCase() + string.slice(1);
// };

/* DEPRECATED */
// For Multer. Get an array of objects and return an object with keys as a specific field of an element of the arrays: https://medium.com/dailyjs/rewriting-javascript-converting-an-array-of-objects-to-an-object-ec579cafbfc7
// export const arrayToObject = (array, keyField) => {
//     return array.reduce((obj, item) => {
//         obj[item[keyField]] = item;

//         return obj;
//     }, {});
// };

/* DEPRECATED */
// // Takes a {} object and returns a FormData object: https://gist.github.com/jmas/35de5a95350e01c12d6fc31eb7216549
// export const objectToFormData = function(obj, form, namespace) {
//     var fd = form || new FormData();
//     var formKey;
//     for (var property in obj) {
//         if (obj.hasOwnProperty(property)) {
//             if (namespace) {
//                 formKey = namespace + '[' + property + ']';
//             } else {
//                 formKey = property;
//             }

//             // if the property is an object, but not a File,
//             // use recursivity.
//             if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
//                 objectToFormData(obj[property], fd, property);
//             } else {
//                 // if it's a string or a File object
//                 fd.append(formKey, obj[property]);
//             }
//         }
//     }

//     return fd;
// };

/* DEPRECATED */
// // Get a Data type from a Sequelize model, check its sizes properties, and rebuild the url with them.
// export const returnImageSizes = function(field) {
//     var sizes = this.rawAttributes[field].format.sizes;
//     var object = {};
//     object['original'] = toAbsolute(this.getDataValue(field)); // Original image
//     sizes.forEach((item) => {
//         var key = 'w' + item.width;
//         var url = this.getDataValue(field).replace('original', key);
//         object[key] = toAbsolute(url);
//     });

//     return object;
// };
