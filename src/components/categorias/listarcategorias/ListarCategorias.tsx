import { useEffect, useState } from "react";
import { PacmanLoader } from 'react-spinners';
import Categoria from "../../../models/Categoria";
import { listar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import CardCategorias from "../cardcategorias/CardCategorias";

function ListarCategorias() {

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function buscarCategorias() {

    setIsLoading(true)

    try {
      await listar('/categorias', setCategorias);
    } catch (error: unknown) {
      if (error instanceof Error) {
        ToastAlerta(`Erro ao listar as Categorias: ${error.message}`, 'erro');
      } else {
        ToastAlerta("Erro desconhecido ao listar as Categorias!", 'erro');
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    buscarCategorias()
  }, [categorias.length])

  return (
    <>

      {isLoading && (

        <PacmanLoader
          color="#0D9488"
          margin={0}
          size={80}
          speedMultiplier={2}
          aria-label="Pacman-loading"
          className='mx-auto my-8'
        />
      )}
      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col mx-4">
          {(!isLoading && categorias.length === 0) && (
            <span className="my-8 text-3xl text-center">
              Nenhuma categoria foi encontrada
            </span>
          )}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categorias
              .sort((a, b) => a.id - b.id)
              .map((categoria: Categoria) => (
                <CardCategorias
                  key={categoria.id}
                  categoria={categoria}
                />
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}
export default ListarCategorias;