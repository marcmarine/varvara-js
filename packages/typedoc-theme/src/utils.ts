import {
  DeclarationReflection,
  ProjectReflection,
  ReflectionKind,
  type Reflection
} from 'typedoc'

export function getDisplayName(refl: Reflection): string {
  let version = ''
  if (
    (refl instanceof DeclarationReflection ||
      refl instanceof ProjectReflection) &&
    refl.packageVersion
  ) {
    version = ` - v${refl.packageVersion}`
  }

  return `${refl.name}${version}`
}

const rootsCache = new WeakMap<ProjectReflection, DeclarationReflection[]>()
export function getHierarchyRoots(
  project: ProjectReflection
): DeclarationReflection[] {
  const cached = rootsCache.get(project)
  if (cached) return cached

  const allClasses = project.getReflectionsByKind(
    ReflectionKind.ClassOrInterface
  ) as DeclarationReflection[]

  const roots = allClasses.filter(refl => {
    if (!refl.implementedBy && !refl.extendedBy) {
      return false
    }

    if (!refl.implementedTypes && !refl.extendedTypes) {
      return true
    }

    const types = [
      ...(refl.implementedTypes || []),
      ...(refl.extendedTypes || [])
    ]

    return types.every(
      type =>
        !type.visit({
          reference(ref) {
            return ref.reflection !== undefined
          }
        })
    )
  })

  const result = roots.sort((a, b) => a.name.localeCompare(b.name))
  rootsCache.set(project, result)
  return result
}
