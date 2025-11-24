import { create } from 'zustand';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { getUsuario } from '../services/firestoreQueries';

const useAuthStore = create((set, get) => ({
  user: null,
  perfil: null,
  isLoading: true,
  setUser: (user, perfil) => set({ user, perfil }),
  bootstrapAuth: () => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        set({ user: null, perfil: null, isLoading: false });
        return;
      }
      try {
        const perfilDoc = await getUsuario(firebaseUser.uid);
        set({ user: firebaseUser, perfil: perfilDoc?.perfil ?? 'representante', isLoading: false });
      } catch (error) {
        console.warn('Falha ao carregar perfil do usuário', error);
        set({ user: firebaseUser, perfil: 'representante', isLoading: false });
      }
    });
    return () => unsubscribe();
  },
  signIn: async (email, password) => {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    const perfilDoc = await getUsuario(credentials.user.uid);
    set({ user: credentials.user, perfil: perfilDoc?.perfil ?? 'representante' });
    return credentials.user;
  },
  signOut: async () => {
    await firebaseSignOut(auth);
    set({ user: null, perfil: null });
  },
}));

export default useAuthStore;

