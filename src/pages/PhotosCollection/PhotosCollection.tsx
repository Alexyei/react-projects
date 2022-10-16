import {FC, useDeferredValue, useEffect, useMemo, useState} from "react";
import classes from "./PhotoCollection.module.scss"

const Collection: FC<{ collectionName: string, imagesLinks: string[] }> = ({collectionName, imagesLinks}) => {
    return (
        <div className={classes.collection}>
            <img className={classes.collection__big} src={imagesLinks[0]} alt="Item"/>
            <div className={classes.collection__bottom}>
                <img className={classes.collection__mini} src={imagesLinks[1]} alt="Item"/>
                <img className={classes.collection__mini} src={imagesLinks[2]} alt="Item"/>
                <img className={classes.collection__mini} src={imagesLinks[3]} alt="Item"/>
            </div>
            <h4>{collectionName}</h4>
        </div>
    );
}

type Collection = {
    category: number,
    name: string,
    photos: string[]
}

function usePagination(elementsPerPage:number, collection:any[]){
    const [activePage, setActivePage] = useState(0)

    useEffect(()=>setActivePage(0),[elementsPerPage,collection])

    function paginate(){
        const startIndex = activePage*elementsPerPage;
        const endIndex = startIndex+elementsPerPage;

        // console.log(startIndex)
        // console.log(endIndex)
        // console.log(collection)
        // console.log(collection.slice(startIndex,endIndex))
        return collection.slice(startIndex,endIndex)
    }

    function getPagesNumbers(){
        const pageCount = Math.floor(collection.length / elementsPerPage) + collection.length % 2;

        return Array.from(Array(pageCount).keys())
    }

    return [activePage, setActivePage, paginate, getPagesNumbers] as const;
}

const PhotoCollection: FC = () => {
    const [categories, setCategories] = useState<string[]>([])
    const [collections, setCollections] = useState<Collection[]>([])
    const [activeCategory, setActiveCategory] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [searchRequest, setSearchRequest] = useState("")

    // const deferredSearchRequest = useDeferredValue(searchRequest)

    // useEffect(()=>console.log("search"),[searchRequest])
    // useEffect(()=>console.log("deferred"),[deferredSearchRequest])

    useEffect(() => {
        function loadCategories() {
            return fetch("https://634aca6e5df952851418d95b.mockapi.io/categories")
                .then(res => res.json())
                .then(data => data.map((d: any) => d.name))
                .then(categories => setCategories(categories))
        }

        function loadPhotoCollections() {
            return fetch("https://634aca6e5df952851418d95b.mockapi.io/photos")
                .then(res => res.json())
                .then(collections => setCollections(collections))
        }

        loadCategories()
            .then(() => loadPhotoCollections())
            .finally(() => setIsLoading(false))

    }, [])

    const filteredCollections = useMemo(()=>{
        let filteredCollections = collections;

        function filterByActiveCategory(collections:Collection[]) {
            return (activeCategory == 0) ? collections : collections.filter((col)=>col.category === activeCategory)
        }

        function filterByName(collections:Collection[]){
            return collections.filter(col=>col.name.toLowerCase().includes(searchRequest.toLowerCase()))
        }

        filteredCollections = filterByActiveCategory(filteredCollections)
        filteredCollections = filterByName(filteredCollections)

        return filteredCollections;

    },[activeCategory,searchRequest  , collections, categories])

    const [activePage, setActivePage, paginate, getPagesNumbers] = usePagination(2, filteredCollections);


    return (
        <>{isLoading ? "Loading..." : <div className={classes.container}>
            <h1>Моя коллекция фотографий</h1>
            <div className={classes.top}>
                <ul className={classes.tags}>
                    { categories.map((cat,index)=>
                        <li key={index} onClick={()=>setActiveCategory(index)} className={activeCategory == index ? classes.active: ''}>{cat}</li>
                    )}
                    {/*<li className={classes.active}>Все</li>*/}
                    {/*<li>Горы</li>*/}
                    {/*<li>Море</li>*/}
                    {/*<li>Архитектура</li>*/}
                    {/*<li>Города</li>*/}
                </ul>
                <input value={searchRequest} onChange={(e)=>setSearchRequest(e.target.value)} className={classes.search__input} placeholder="Поиск по названию"/>
            </div>
            <div className={classes.content}>
                {paginate().map( (col,index)=>
                    <Collection
                        key={index}
                        collectionName={col.name}
                        imagesLinks={col.photos}
                    />
                )}
            </div>
            <ul className={classes.pagination}>
                {
                    getPagesNumbers().map(el=> <li onClick={()=>setActivePage(el)} key={el} className={el==activePage?classes.active:""}>{el+1}</li>)
                }
            </ul>
        </div>}</>
    )
}

export default PhotoCollection;