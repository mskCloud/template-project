import fs from 'node:fs/promises'

const generateDocTemplate = ({ projectTitle = '', dependencies = {}, devDependencies = {} }) => {
    const title = `## ${projectTitle}\n\n`

    const depTitle = `### dependencies\n\n`
    const devDepTitle = '### devDependencies\n\n'

    const tableHeader = `| 名称 | 版本 | 名称 | 版本 |\n| ---- | ---- | ---- | ---- |\n`
    const setDocTable = (tables) => {
        const maxCol = 2
        let col = 0
        let depTable = tableHeader
        for (const key in tables) {
            if (col >= maxCol) {
                col = 0
                depTable += `|\n| ${key} | ${tables[key]}`
                continue
            }
            depTable += `| ${key} | ${tables[key]}`
            col++
        }
        return `${depTable}|\n\n`
    }

    return `${title}${depTitle}${setDocTable(dependencies)}${devDepTitle}${setDocTable(devDependencies)}`
}

const updateProjectDepTable = async () => {
    try {
        let depsTable = `# 项目依赖表\n\n`
        const dirs = await fs.readdir('packages', { encoding: 'utf-8', recursive: false })

        for (const item of dirs) {
            const file = await fs.readFile(`packages/${item}/package.json`, {
                encoding: 'utf-8',
            })
            const packageJSON = JSON.parse(file)
            depsTable += generateDocTemplate({
                projectTitle: item,
                dependencies: packageJSON.dependencies || {},
                devDependencies: packageJSON.devDependencies || {},
            })
        }

        await fs.writeFile('docs/project-deps.md', depsTable, { encoding: 'utf-8', flag: 'w' })

        console.log('项目依赖表：更新成功')
    } catch (error) {
        console.error(error)
    }
}

;(async function updateDoc() {
    updateProjectDepTable()
})()
