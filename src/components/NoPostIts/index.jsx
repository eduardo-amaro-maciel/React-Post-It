function NopostIts() {

    return (
        <div className="flex items-center justify-center gap-5 flex-1">
            <img
                src="/img/no-posts.svg"
                alt="Nenhuma tarefa encontrada"
                className="max-w-sm w-full flex-1"
            />
            <div className="text-3xl max-w-sm text-secondery">
                <b className="text-5xl mb-0">OPS!</b> <br />
                <p>Parece que você não possui nenhum post-it.</p>
            </div>
        </div>
    )
}

export default NopostIts;