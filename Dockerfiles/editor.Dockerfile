ARG editorVersion


FROM thinca/vim:$editorVersion 

WORKDIR /var/app

VOLUME ./Client ./client
VOLUME ./Server ./server
VOLUME ./Mysql/Database ./db

### USER CONFIG ###
RUN apk add --update sudo

RUN adduser -DSh /home/editor -s /bin/sh editor 
RUN echo "editor ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/editor \
        && chmod 0440 /etc/sudoers.d/editor
        
RUN chown editor:root -R /var/app/
RUN chown editor:root -R /home/editor/
###################

RUN apk add --update vim
RUN apk add git curl htop
RUN curl -fLo /var/app/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim


