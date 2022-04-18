
//Clase con los métodos que comprimen el archivo.

class LWZalgorithm {

    static compress = (data = []) =>{
 
        let uncompressDoc = data; //Arreglo de caracteres del bitstream
        let dictionary = {};    //Diccionario de los caracteres
        let word = '';          //En esta variable se guarda el char anterior
        let result = [];        //Resultado final comprimido
        let dictSize = 256;

        
        for (let i = 0; i < 256; i++)
        {
            /* Recorre los 256 ascii codes y creo un diccionario con ellos
            fromCharCode devuelve el char del codigo Ascii que recorremos

            ejemplo:

            dictionary{
                a: 97,
                b: 98,
                c: 99
            }
            */

            dictionary[String.fromCharCode(i)] = i;
        }


        for (let i = 0, len = uncompressDoc.length; i < len; i++){

            let currentChar = uncompressDoc[i];          // El char del recorrido actual
            let joinedChars = word + currentChar;        // Une el char actual con el anterior

            //Verifico en mi diccionario si hay una combinación igual
            if (dictionary.hasOwnProperty(joinedChars)) 
            {
                word = joinedChars;
            }else
            {
                //Al no existir la combinación, la agregamos al resultado y al diccionario
                result.push(dictionary[word]);
               
                dictionary[joinedChars] = dictSize++;
                word = currentChar;
                
            }     
        }


        if (word !== '')
        {
            result.push(dictionary[word]);
        }

        return result
    }



    static descompress(compressDoc = []){

      
        console.log(compressDoc);

        let dictionary = {};                                    //Diccionario de los caracteres
        let word = String.fromCharCode(compressDoc[0]);         //En esta variable se guarda el char ante
        let dictSize = 256;                                     //tamaño del diccionario
        let result = word;                                      //resultado
        let entrada = '';                                            //guardo los simbolos que representan

        //inicio arreglo
        for (let i = 0; i < 256; i += 1) {
            dictionary[i] = String.fromCharCode(i);
        }
        
        //recorro cada ascii code 
        for (let i = 1, len = compressDoc.length; i < len; i++){

            //Guardo codigo actual
            let currentNumber = compressDoc[i];


            // si existe en el diccionario se agrega a la entrada
            if (dictionary[currentNumber] !== undefined)
            {
                entrada = dictionary[currentNumber];

            }else{

                if(currentNumber === dictSize){
                    entrada = word + word[0];
                }
                else
                {
                    throw 'Error calculo';
                    return null;
                }    
            }
            result += entrada;
            dictionary[dictSize++] = word + entrada[0];
            word = entrada;
        }

        return result;
    }
}


module.exports = LWZalgorithm

