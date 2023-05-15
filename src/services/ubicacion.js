 //import ApiPublic '@/api/ApiPublic'
 
 const getResults  = async (page = 1) => {
    try {
        const { data: resp }  = await ApiPublic.get('/ubicacion?page='+page);
        this.ubicaciones = resp
    }
    catch( error ){
        this.message = error.response.data.message
    }
  }